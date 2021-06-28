import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { ProspectScenarioQuadrant } from '../model/prospectScenarioQuadrant';
import { FirestoreReferencesService } from './firestore-references.service';

@Injectable({
  providedIn: 'root'
})
export class ProspectScenarioService {

  constructor(private firestore: AngularFirestore, public firestoreReferenceService: FirestoreReferencesService) { 
    
  }
  makeQuadrant(quadrantName: string) {
    var makeQuadrant = new ProspectScenarioQuadrant();
    this.firestoreReferenceService.getQuadrant(quadrantName).set(makeQuadrant.getFirestoreObject());
  }

  getQuadrant(nr: string) {
    return this.firestoreReferenceService.getQuadrant(nr);
  }

  getProspectAxis(){
    return this.firestoreReferenceService.getProjectReference().valueChanges();
  }
  // Update specific fields on project
  setProspectAxis(update) {
    this.firestoreReferenceService.getProjectReference().update(update);
  }

  quadrantNames = ["1","2","3","4"]


  getSelectedProspectQuadrant() {
    return this.firestoreReferenceService.getProspectScenarioQuadrantCollection().valueChanges().pipe(map(
      quadrants => {
        return quadrants.filter(quadrant => quadrant.selected ==="selected")
      }
    ));    
  }

  // Update specific fields on project
  updateQuadrantInformation(update, quadrantName: string) {
    // If one quadrant is selected, all other quadrants must be notSelected
    if(update.selected) {
      if(update.selected ==="selected") {
        this.quadrantNames.forEach(name => {
          if(name !== quadrantName) {
            this.firestoreReferenceService.getQuadrant(name).update({selected: "notSelected"});
          }
        })
      }
    }
    this.firestoreReferenceService.getQuadrant(quadrantName).update(update);
  }
}
