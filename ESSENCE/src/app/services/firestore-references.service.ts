import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import * as ids from '../assets/vars';
import { CategoryItem } from '../model';
import { Item } from '../model/item';
import { ItemConnection } from '../model/itemConnection';
import { PcrtItem } from '../model/pcrtItem';
import { Project } from '../model/project';
import { IProspectScenarioQuadrant, ProspectScenarioQuadrant } from '../model/prospectScenarioQuadrant';
import { Swotitem } from '../model/swotItem';


@Injectable({
  providedIn: 'root'
})
export class FirestoreReferencesService {

  constructor(private firestore: AngularFirestore) { }

  getQuadrant(id: string) {
    return this.getProspectScenarioQuadrantCollection().doc(id);
  }
  getProspectScenarioQuadrantCollection() {
    return this.getProjectReference().collection<IProspectScenarioQuadrant>(ids.prospectScenarioQuadrantCollection);
  }

  getEcologyObject(ecologyItemId) {
    return this.getEcologyObjectCollection().doc(ecologyItemId)
  } 

  getEcologyObjectCollection() {
    return this.getProjectReference().collection<Swotitem>(ids.ecologyObject);
  }
  getLeveragePointCollection() {
    return this.getProjectReference().collection<PcrtItem>(ids.leveragePoint);
  }

  getCriteria(parentFeatureId) {
    return this.getCriteriaCollection().doc(parentFeatureId).collection<Item>(ids.criteriaCollection);
  }
  getCriteriaCollection() {
    return this.getCategory(ids.feature);
  }

  // Get refrence to specific document
  categoryItemRefrence(itemId: string, category: string) {
    return this.firestore.collection(ids.diagramsCollection).doc(this.getCurrentProject()).collection(category).doc(itemId);
  }
  getCategory(category) {
    return this.getProjectReference().collection(category);
  }
  getConnectedItems(focusItemCategory, focusItemId) {
    return this.firestore.collection(ids.diagramsCollection).doc(this.getCurrentProject()).collection(focusItemCategory).doc(focusItemId).collection<ItemConnection>("connectedItems");
  }

  getProjectReference() {
  return this.firestore.collection(ids.diagramsCollection).doc<Project>(this.getCurrentProject());
  }
 
  // Gets the current project ID from localstorage
  getCurrentProject() {
    return JSON.parse(localStorage.getItem('project'));
  }
}
