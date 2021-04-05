import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import * as ids from '../assets/vars';
import { Item } from '../model/item';
import { PcrtItem } from '../model/pcrtItem';
import { Swotitem } from '../model/swotItem';


@Injectable({
  providedIn: 'root'
})
export class FirestoreReferencesService {

  constructor(private firestore: AngularFirestore) { }

  getEcologyItem(ecologyItemId) {
    return this.getEcologyItemCollection().doc(ecologyItemId)
  } 

  getEcologyItemCollection() {
    return this.getProjectReferecne().collection<Swotitem>(ids.ecologyObject);
  }
  getLeveragePointCollection() {
    return this.getProjectReferecne().collection<PcrtItem>(ids.leveragePoint);
  }

  getCriteria(parentFeatureId) {
    return this.getCriteriaCollection().doc(parentFeatureId).collection<Item>(ids.criteriaCollection);
  }
  getCriteriaCollection() {
    return this.getCategory(ids.feature);
  }

  getCategory(category) {
    return this.getProjectReferecne().collection(category);
  }

  getProjectReferecne() {
  return this.firestore.collection(ids.diagramsCollection).doc(this.getCurrentProject());
  }
 
  // Gets the current project ID from localstorage
  getCurrentProject() {
    return JSON.parse(localStorage.getItem('project'));
  }
}
