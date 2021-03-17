import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as ids from '../assets/vars';
import { Category, CategoryItem } from '../model';
import { Diagram } from '../model/diagram';
import { DiagramReference } from '../model/diagramReference';
@Injectable({
  providedIn: 'root'
})

// Service should retrieve and update the content of a category
export class CategoryService {
  categoriesData: any;

  constructor(private firestore: AngularFirestore) { 
    this.firestore.collection("users").doc("${user.uid}").collection<DiagramReference>(ids.diagramsCollection).valueChanges().subscribe(
      userdata => {
        if(userdata) {
          this.categoriesData = userdata;
        }
        else {
          this.categoriesData = null;
        }
      }
    );
  }

  addNewProject(projectName: string) {
        // Get current user
        const user = JSON.parse(localStorage.getItem('user'));
    // Project ID
    var projectID = this.firestore.createId();
    this.firestore.collection(ids.usersCollection).doc("${user.uid}").collection(ids.diagramsCollection).add({projectId: projectID});
    this.firestore.collection(ids.diagramsCollection).doc(projectID).set(
      {projectName: projectName});
    // As challenge, problem and prospect are single item categories, we need to add an empty field to each
    this.firestore.collection(ids.diagramsCollection).doc(projectID).collection(ids.challenge).add({text:"", orderNr: 1});
    this.firestore.collection(ids.diagramsCollection).doc(projectID).collection(ids.problem).add({text:"", orderNr: 1});
    this.firestore.collection(ids.diagramsCollection).doc(projectID).collection(ids.prospect).add({text:"", orderNr:1});
  }
  getDiagram(diagramId: string) {
    return this.firestore.collection(ids.diagramsCollection).doc<Diagram>(diagramId);
  }

  // Returns reference to the category of chosen diagram
  getCategoryItems(category: string, project: string) {
    return this.firestore.collection(ids.diagramsCollection).doc(project).collection<CategoryItem>(category, ref => ref.orderBy("orderNr"));
  }
  // Retrieve an overview of diagrams for this user
  getUserDiagrams(){
    // Get current user
    const user = JSON.parse(localStorage.getItem('user'));

    return this.firestore.collection("users").doc("${user.uid}").collection<DiagramReference>(ids.diagramsCollection);
  }

  /* Get all items for the category as CategoryItem
  getCategoryItems(category: string) {
    return this.firestore.collection(ids.categories).doc(category).collection<CategoryItem>("items").snapshotChanges().pipe(map(changes =>
      changes.map(c => 
        // Get ID and nr
        ({id: c.payload.doc['id'], ...c.payload.doc.data()}))));
  }
  */
  getCategory(category: string) {
    return this.firestore.collection(ids.categories).doc<Category>(category).valueChanges();
  }

  addItem(category: string, nr: number, project: string){
    this.firestore.collection(ids.diagramsCollection).doc(project).collection(category).add({text:"", orderNr:nr});
  }

  updateItem(category: string, itemId: string, text: string, nr:number, project: string) {
    this.firestore.collection(ids.diagramsCollection).doc(project).collection(category).doc(itemId).set({text:text, orderNr:nr});
  }
  deleteItem(category: string, itemId: string, project: string){
    this.firestore.collection(ids.diagramsCollection).doc(project).collection(category).doc(itemId).delete();
  }
}
