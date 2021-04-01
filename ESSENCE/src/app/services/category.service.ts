import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as ids from '../assets/vars';
import { Category, CategoryItem, Status } from '../model';
import { Project, ProjectStage } from '../model/project';
import { DiagramReference } from '../model/diagramReference';
@Injectable({
  providedIn: 'root'
})

// Service should retrieve and update the content of a category
export class CategoryService {

  constructor(private firestore: AngularFirestore) { 
    
  }

  getInformation(category: string) {
    return this.firestore.collection(ids.categoriesCollection).doc<Category>(category);
  }

  // Returns reference to the category of chosen diagram
  getCategoryItems(category: string) {
    return this.firestore.collection(ids.diagramsCollection).doc(this.getCurrentProject()).collection<CategoryItem>(category, ref => ref.orderBy("orderNr"));
  }

  // Returns reference to the category of chosen diagram
  getItemsFromCategory(category: string) {
    return this.firestore.collection(ids.diagramsCollection).doc(this.getCurrentProject()).collection<CategoryItem>(category, ref => ref.orderBy("orderNr")).valueChanges();
  }
  // Retrieve an overview of diagrams for this user
  getUserDiagrams(){
    // Get current user
    const user = JSON.parse(localStorage.getItem('user'));

    return this.firestore.collection(ids.connectedDiagramsCollection).doc(user.uid).collection<DiagramReference>(ids.diagramsCollection);
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
    return this.firestore.collection(ids.categoriesCollection).doc<Category>(category).valueChanges();
  }


  getChallenge() {
    return this.challengeRef().valueChanges();
  }

  updateChallenge(value: string) {
    this.challengeRef().get().subscribe(doc => doc.forEach(doc => this.firestore.collection(ids.diagramsCollection).doc(this.getCurrentProject()).collection(ids.problematic).doc(doc.id).update({text:value})));
  }
  challengeRef() {
    return this.firestore.collection(ids.diagramsCollection).doc(this.getCurrentProject()).collection(ids.problematic, ref => ref.where("subcategory", '==', "challenge").limit(1));
  }

  getSubCategory(subCategory: string) {
    return this.subCategoryRef(subCategory).valueChanges();
  }

  updateSubCategory(value: string, subCategory: string) {
    this.subCategoryRef(subCategory).get().subscribe(doc => doc.forEach(doc => this.firestore.collection(ids.diagramsCollection).doc(this.getCurrentProject()).collection(ids.problematic).doc(doc.id).update({text:value})));
  }
  subCategoryRef(subCategory: string) {
    return this.firestore.collection(ids.diagramsCollection).doc(this.getCurrentProject()).collection(ids.problematic, ref => ref.where("subcategory", '==', subCategory).limit(1));
  }
  // Gets the current project ID from localstorage
  getCurrentProject() {
    return JSON.parse(localStorage.getItem('project'));
  }
}
