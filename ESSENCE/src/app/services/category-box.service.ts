import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Category, Status } from '../model';
import { ChosenFeature } from '../model/chosenFeature';
import * as ids from '../assets/vars';
import { Item } from '../model/item';


@Injectable({
  providedIn: 'root'
})
export class CategoryBoxService {

  categoryReference: AngularFirestoreCollection;

  view = "";
  title = "";
  tooltip = "";
  parent;
  constructor(
    public firestore: AngularFirestore, 
    ) { 

  }
  setReference(parent) {
    this.parent = parent;
    var type = parent.type;
    if(parent.type == "chosenFeature") {
      this.title = parent.text;

      this.view = "process";
      this.categoryReference = this.firestore.collection(ids.diagramsCollection).doc(this.getCurrentProject()).collection(ids.feature).doc(parent.id).collection<Item>(ids.criteriaCollection);
    }
    else if(parent.type = "category") {
      this.title = parent.displayTitle;
      this.view = parent.view;
      this.tooltip = parent.tooltip;
      this.categoryReference = this.firestore.collection(ids.diagramsCollection).doc(this.getCurrentProject()).collection<Item>(parent.id);
    }
    else {
      // Should throw an error or something 
      return null;
    }
  }

  getItems() {
    return this.categoryReference.snapshotChanges();
  }

  deleteItem(item: Item){
    if(item.localOnly) {
      // Should not try to delete local item 
      console.log("Trying to delete local item. This should not be possible");
    }
    else {
      // TODO should also delete all subcollections!
      this.categoryReference.doc(item.id).delete();
    }
  }


  updateItemOrderNr(item: Item) {
    if(item.localOnly) {
      // Not sure how this should be handled
      console.log("Updating order nr of local item");
    }
    else {
      this.categoryReference.doc(item.id).update({orderNr: item.orderNr});
    }
  }
  // Adds a document with the ID and content to firestore
  addItem(item: Item) {
    this.categoryReference.doc(item.id).set({text:item.text, orderNr:item.orderNr, status: Status.active});
  }

  // Update the text for the item 
  updateItemText(item: Item){
    // If the item is local only, it needs to be added to the database
    if(item.localOnly){
      this.addItem(item);
    }
    // If the item is not local, the ID is already present and only the text should be updated
    else{
      this.categoryReference.doc(item.id).update({text: item.text});
    }
  }

  // Updates the status of the item. 
  updateItemStatus(item: Item) {
    // Should only try to update on non-local items
    if(item.localOnly) {
      console.log("Trying to update status on non local item. This should not be possible");
    }
    else {
      this.categoryReference.doc(item.id).update({status: item.status});
    }
  }


  // Gets the current project ID from localstorage
  getCurrentProject() {
    return JSON.parse(localStorage.getItem('project'));
  }
}