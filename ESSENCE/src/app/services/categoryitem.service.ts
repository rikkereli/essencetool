import { Injectable } from '@angular/core';
import * as Model from '../model';
import {AngularFirestore} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import * as ids from './../assets/vars';
import { ItemConnection } from '../model/itemConnection';
import { Project } from '../model/project';
import { CategoryItem, Status } from '../model';
import { ChosenFeature } from '../model/chosenFeature';
import { Criteria } from '../model/criteria';
import { map } from 'rxjs/operators';
import { FirestoreReferencesService } from './firestore-references.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryitemService {
  inFocusObject: BehaviorSubject<{itemId: string, parentCategory: string}>;

  constructor(
    private firestore: AngularFirestore,
    public firestoreReferenceService: FirestoreReferencesService,
    public router: Router, // The application router
    ) { 
    this.inFocusObject = <BehaviorSubject<{itemId:string, parentCategory: string}>> new BehaviorSubject( { itemId: "", parentCategory: ""});

  }
  getItems(category:string) {
    return this.firestoreReferenceService.getCategory(category).valueChanges().pipe(map(
      items => 
        items.map(item => {
          var categoryItem = new CategoryItem(item.orderNr)
          categoryItem.updateItemValue(item);
          return categoryItem
        })       
    ));
  }

    // Adds a document with the ID and content to firestore
  addItem(categoryItem: CategoryItem, category: string) {
    this.firestoreReferenceService.getCategory(category).doc(categoryItem.id).set({text:categoryItem.text, orderNr:categoryItem.orderNr, status: Status.active});
  }
  
  // Get items that are connected to this item 
  getConnectedItems(focusItemId: string, focusItemCategory: string) {
    return this.firestoreReferenceService.getConnectedItems(focusItemCategory, focusItemId)
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
        this.firestoreReferenceService.categoryItemRefrence(categoryItem.id, category).delete();
      }
    }
  
  
    updateItemOrderNr(categoryItem: CategoryItem, category: string) {
      if(categoryItem.localOnly) {
        // Not sure how this should be handled
        console.log("Updating order nr of local item");
      }
      else {
        this.firestoreReferenceService.categoryItemRefrence(categoryItem.id, category).update({orderNr: categoryItem.orderNr});
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
        this.firestoreReferenceService.categoryItemRefrence(cateogryItem.id, category).update({text: cateogryItem.text});
      }
    }
    // Updates the status of the item. 
    updateItemStatus(categoryItem: CategoryItem, category: string) {
      // Should only try to update on non-local items
      if(categoryItem.localOnly) {
        console.log("Trying to update status on non local item. This should not be possible");
      }
      else {
        this.firestoreReferenceService.categoryItemRefrence(categoryItem.id, category).update({status: categoryItem.status});
      }
    }
    getFeatures(){
      return this.firestore.collection(ids.diagramsCollection).doc(this.getCurrentProject()).collection<ChosenFeature>(ids.feature).snapshotChanges().pipe(map(
        features => {
          return features.map(feature => {
            var element = {id: feature.payload.doc['id'], ...feature.payload.doc.data()};
            var feat = new ChosenFeature(element.id, element.text);
            feat.updateFeatureValue(element);
            return feat;
          })
        }));
    }
    // Return criteria for feature
    getCriterias(feature: string) {
      return this.firestore.collection(ids.diagramsCollection).doc(this.getCurrentProject()).collection(ids.feature).doc(feature).collection<CategoryItem>(ids.criteriaCollection);
    }
    updateCriteriaText(feature: string, criteria: Criteria) {
      return this.firestore.collection(ids.diagramsCollection).doc(this.getCurrentProject()).collection(ids.feature).doc(feature).collection(ids.criteriaCollection).doc(criteria.id).set(criteria);
    }

    toogleFeatureActivity(chosenFeature: ChosenFeature){
      this.firestore.collection(ids.diagramsCollection).doc(this.getCurrentProject()).collection(ids.feature).doc(chosenFeature.id).update({chosen: chosenFeature.chosen});
    }
}
