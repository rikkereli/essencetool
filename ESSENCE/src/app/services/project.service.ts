import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import * as ids from '../assets/vars';
import { Status } from '../model';
import { DiagramReference } from '../model/diagramReference';
import { Project, ProjectStage } from '../model/project';
import * as routes from '../assets/routes';
import { FirestoreReferencesService } from './firestore-references.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  // In the beginning, the behaviorsubject is empty as we are not in any project
  currentProject: BehaviorSubject<string> = new BehaviorSubject("projects");
  projectsData: any;

  constructor(private firestore: AngularFirestore, public firestoreAuth: AngularFireAuth, public firestoreReferenceService: FirestoreReferencesService) { 
        // Listen to changes in login status and update list of projects accordingly
        this.firestoreAuth.authState.subscribe(user => {
          // If login successful
          if (user) {
            this.firestore.collection(ids.connectedDiagramsCollection).doc(user.uid).collection<DiagramReference>(ids.diagramsCollection).valueChanges().subscribe(
              userdata => {
                if(userdata) {
                  this.projectsData = userdata;
                }
                else {
                  this.projectsData = null;
                }
              }
            );
        
          }
          // When logged out/ login not sucessful
          else {
            this.projectsData = null;
          }
        });
    
  }

  // Update current project
  setCurrentProject(projectId: string) {
    this.currentProject.next(projectId);
  }
  
  inviteUserToProject(email) {
    this.firestore.collection(ids.diagramsCollection).doc(this.getCurrentProject()).collection(ids.memebers).add({email: email});
    this.firestore.collection(ids.connectedDiagramsCollection, ref => ref.where('email','==', email).limit(1)).snapshotChanges().subscribe(document => {
      var projectId = this.getCurrentProject();
      this.firestore.collection(ids.connectedDiagramsCollection).doc(document[0].payload.doc.id).collection(ids.diagramsCollection).doc(projectId).set({projectId: projectId});
      // Add the project to the list for document
    })

  }
    // Deletes a project in the firestore
  // Should delete it both for the user and in the documents 
  deleteProject(projectId: string) {
    const user = JSON.parse(localStorage.getItem('user'));

    // delete prject in user project collection

    

    // TODO Should figure out a way to delete subcollections in order to limit memory usage
    // For each subcollection, delete all documents
    ids.categoriesArray.forEach(category => {
      this.firestore.collection(ids.diagramsCollection).doc(projectId).collection(category).get().subscribe(
        // Get each document in subcollection
        (collection) => {
          collection.forEach(doc => {
            // delete all connected items for item
            this.firestore.collection(ids.diagramsCollection).doc(projectId).collection(category).doc(doc.id).collection("connectedItems").get().subscribe(items =>
              { 
              items.forEach(item =>{
              console.log("Attempting to delete connection for " + doc.id + " to " + item.id);
              this.firestore.collection(ids.diagramsCollection).doc(projectId).collection(category).doc(doc.id).collection("connectedItems").doc(item.id).delete();
              console.log("Connection for " + doc.id + " to " + item.id + " deleted");
            })}
              );
            this.firestore.collection(ids.diagramsCollection).doc(projectId).collection(category).doc(doc.id).delete();
            console.log("Item " + doc.id + " on category " + category + " deleted")
          });
        }
      );
    }
    )
    this.firestore.collection(ids.connectedDiagramsCollection).doc(user.uid).collection(ids.diagramsCollection).doc(projectId).delete();
    this.firestore.collection(ids.diagramsCollection).doc(projectId).delete();
    console.log("Project deleted")
  }

  addNewProject(projectName: string) {

    // Project ID
    var projectId = this.firestore.createId();
    this.addNewProjectToUser(projectId);
    this.addNewProjectToProjectCollection(projectId, projectName);

  }

  private addNewProjectToUser(projectId: string) {
    // Get current user for 
    const user = JSON.parse(localStorage.getItem('user'));
    // Update doc so we are sure it exists
    this.firestore.collection(ids.connectedDiagramsCollection).doc(user.uid).collection(ids.diagramsCollection).doc(projectId).set({projectId: projectId});
  }
  private addNewProjectToProjectCollection(projectId: string, projectName: string) {
    const user = JSON.parse(localStorage.getItem('user'));
    // Projects should always start on challenge detected
    this.firestore.collection(ids.diagramsCollection).doc(projectId).set(
      {projectName: projectName, projectStage: routes.challengeDetectedActivity});
    var projectRef = this.firestore.collection(ids.diagramsCollection).doc(projectId);
    // As challenge, problem and prospect are single item categories, we need to add an empty field to each
    projectRef.collection(ids.problematic).add({subcategory: ids.challenge, text:"", orderNr: 1, status: Status.active});
    projectRef.collection(ids.problematic).add({subcategory: ids.problem, text:"", orderNr: 2, status: Status.active});
    projectRef.collection(ids.problematic).add({subcategory: ids.warrant, text:"", orderNr: 3, status: Status.active});
    projectRef.collection(ids.resolution).add({subcategory: ids.prospect, text:"", orderNr: 1, status: Status.active});
    projectRef.collection(ids.resolution).add({subcategory: ids.backing, text:"", orderNr: 2, status: Status.active});
    projectRef.collection(ids.qualification).add({subcategory: ids.qualifier, text:"", orderNr:1, status: Status.active});
    projectRef.collection(ids.qualification).add({subcategory: ids.rebuttal, text:"", orderNr:2, status: Status.active});

    projectRef.collection(ids.memebers).add({email: user.email});
  }

  updateProjectStage(stage: string) {
    var project = this.getCurrentProject();
    this.firestore.collection(ids.diagramsCollection).doc(project).update({projectStage: stage});
  }

  getSelectedEcologyObjects(){
    return this.firestoreReferenceService.getEcologyObjectCollection().valueChanges().pipe(
      map(obj => obj.filter(object => object.status === 1)));
  }

  getSelectedLeveragePoints(){
    return this.firestoreReferenceService.getLeveragePointCollection().valueChanges().pipe(
      map(obj => obj.filter(object => object.status === 1)));
  }
  getProject(diagramId: string) {
    return this.firestore.collection(ids.diagramsCollection).doc<Project>(diagramId);
  }
  // Gets the current project ID from localstorage
  getCurrentProject() {
      return JSON.parse(localStorage.getItem('project'));
  }
}
