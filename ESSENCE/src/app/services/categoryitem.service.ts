import { Injectable } from '@angular/core';
import * as Model from '../model';
import {AngularFirestore} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import * as ids from './../assets/vars';
import { ItemConnection } from '../model/itemConnection';
import { Project } from '../model/project';
import { CategoryItem, Status } from '../model';

@Injectable({
  providedIn: 'root'
})
export class CategoryitemService {
  inFocusObject: BehaviorSubject<{itemId: string, parentCategory: string}>;

  constructor(
    private firestore: AngularFirestore,
    public router: Router, // The application router
    ) { 
    this.inFocusObject = <BehaviorSubject<{itemId:string, parentCategory: string}>> new BehaviorSubject( { itemId: "", parentCategory: ""});

  }

    // Adds a document with the ID and content to firestore
    addItem(categoryItem: CategoryItem, category: string) {
      this.firestore.collection(ids.diagramsCollection).doc(this.getCurrentProject()).collection(category).doc(categoryItem.id).set({text:categoryItem.text, orderNr:categoryItem.orderNr, status: Status.active});
    }
  
  // Get items that are connected to this item 
  getConnectedItems(focusItemId: string, focusItemCategory: string) {
    var project = JSON.parse(localStorage.getItem('project'));
    return this.firestore.collection(ids.diagramsCollection).doc<Project>(project).collection(focusItemCategory).doc(focusItemId).collection<ItemConnection>("connectedItems");
  }

  addConntectionBetweenItems(focusItemId: string, focusItemCategory: string, connectItemId: string, connectedItemCategory: string) {
    var project = JSON.parse(localStorage.getItem('project'));

    this.getFocusItemRef(project, focusItemId, focusItemCategory, connectItemId).set({itemId: connectItemId});    
    this.getConnectedItemRef(project, focusItemId,connectItemId,connectedItemCategory).set({itemId: focusItemId});
  }

  removeConnectionsBetweenItems(focusItemId: string, focusItemCategory: string, connectItemId: string, connectedItemCategory: string) {
    var project = JSON.parse(localStorage.getItem('project'));
    this.getFocusItemRef(project, focusItemId, focusItemCategory, connectItemId).delete();    
    this.getConnectedItemRef(project, focusItemId,connectItemId,connectedItemCategory).delete();    
  }

  getFocusItemRef(project: string, focusItemId: string, focusItemCategory: string, connectItemId: string) {
    return this.firestore.collection(ids.diagramsCollection).doc(project).collection(focusItemCategory).doc(focusItemId).collection("connectedItems").doc(connectItemId);
  }
  getConnectedItemRef(project: string, focusItemId: string, connectItemId: string, connectedItemCategory: string) {
    return this.firestore.collection(ids.diagramsCollection).doc(project).collection(connectedItemCategory).doc(connectItemId).collection("connectedItems").doc(focusItemId);
  }
    // Get refrence to specific document
    itemRefrence(itemId: string, category: string) {
      return this.firestore.collection(ids.diagramsCollection).doc(this.getCurrentProject()).collection(category).doc(itemId);
    }
    // Gets the current project ID from localstorage
    getCurrentProject() {
      return JSON.parse(localStorage.getItem('project'));
  
    }
    deleteItem(categoryItem: CategoryItem, category: string){
      if(categoryItem.localOnly) {
        // Should not try to delete local item 
        console.log("Trying to delete local item. This should not be possible");
      }
      else {
        // TODO should also delete all subcollections!
        this.itemRefrence(categoryItem.id, category).delete();
      }
    }
  
  
    updateItemOrderNr(categoryItem: CategoryItem, category: string) {
      if(categoryItem.localOnly) {
        // Not sure how this should be handled
        console.log("Updating order nr of local item");
      }
      else {
        this.itemRefrence(categoryItem.id, category).update({orderNr: categoryItem.orderNr});
      }
    }
  
    // Update the text for the item 
    updateItemText(cateogryItem: CategoryItem, category: string){
      // If the item is local only, it needs to be added to the database
      if(cateogryItem.localOnly){
        this.addItem(cateogryItem, category);
      }
      // If the item is not local, the ID is already present and only the text should be updated
      else{
        this.itemRefrence(cateogryItem.id, category).update({text: cateogryItem.text});
      }
    }
    // Updates the status of the item. 
    updateItemStatus(categoryItem: CategoryItem, category: string) {
      // Should only try to update on non-local items
      if(categoryItem.localOnly) {
        console.log("Trying to update status on non local item. This should not be possible");
      }
      else {
        this.itemRefrence(categoryItem.id, category).update({status: categoryItem.status});
      }
    }
}
