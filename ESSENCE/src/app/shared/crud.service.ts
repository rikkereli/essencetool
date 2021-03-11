import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CategoryItem } from './category-item';
import * as ids from '../assets/vars';
import { Category } from './category';
@Injectable({
  providedIn: 'root'
})
export class CrudService{
  // My collection of categories
  itemsCollection: AngularFirestoreCollection<Category>;

  constructor(private store: AngularFirestore) {
    this.itemsCollection = this.store.collection(ids.categories);
   }

  // Add an item to items list
  AddItem(categoryItem: CategoryItem, category: string) {
    this.itemsCollection.doc(category).collection(ids.items).add(categoryItem);
  }

  GetItem(id: string) {

  }
  GetItemList(category: string) {
    return this.itemsCollection.doc(category).collection(ids.items);
    //this.itemsRef = this.db.list();
  }
}
