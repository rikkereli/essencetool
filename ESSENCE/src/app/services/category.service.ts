import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as ids from '../assets/vars';
import { Category, CategoryItem } from '../model';
@Injectable({
  providedIn: 'root'
})

// Service should retrieve and update the content of a category
export class CategoryService {

  constructor(private firestore: AngularFirestore) { 
  }

  // Get all items for the category as CategoryItem
  getCategoryItems(category: string) {
    return this.firestore.collection(ids.categories).doc(category).collection<CategoryItem>("items").snapshotChanges().pipe(map(changes =>
      changes.map(c => 
        // Get ID and nr
        ({id: c.payload.doc.id, ...c.payload.doc.data()}))));
  }
  getCategory(category: string) {
    return this.firestore.collection(ids.categories).doc<Category>(category).valueChanges();
  }

  addItem(category: string, nr: number){
    this.firestore.collection(ids.categories).doc(category).collection(ids.items).add({text:"", orderNr:nr});
  }

  updateItem(category: string, itemId: string, text: string, nr:number) {
    this.firestore.collection(ids.categories).doc(category).collection(ids.items).doc(itemId).set({text:text, orderNr:nr});
  }
  deleteItem(category: string, itemId: string){
    this.firestore.collection(ids.categories).doc(category).collection(ids.items).doc(itemId).delete();
  }
}
