import { Component, OnInit } from '@angular/core';
import { CategoryBoxComponent } from './../category-box/category-box.component'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {TextFieldModule} from '@angular/cdk/text-field';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as ids from './../assets/vars';
import { map } from 'rxjs/operators';
import { CategoryView } from '../app.component';

@Component({
  selector: 'app-category-overview',
  templateUrl: './category-overview.component.html',
  styleUrls: ['./category-overview.component.scss']
})
export class CategoryOverviewComponent implements OnInit {
  constructor(private store: AngularFirestore) { 
    //this.store.collection(ids.leverage).doc('A').update({a: "AAA"});
    var str =  ids.leverage 
    //let leverageCol = this.store.collection(ids.leverage).snapshotChanges().subscribe((querySnapshot)=> {querySnapshot.forEach((doc) => {})});
    //leverageCol.get().then((querySnapshot) => {

    //})
    //this.leverageItemsList = this.store.collection('leverage').valueChanges({});

    this.leverage$ = store.collection<CategoryView>(ids.leverage).doc("view").valueChanges();
  }


  ngOnInit(): void {
  }
  
  
  leverage$: Observable<CategoryView>;
  leverageCategoryRef =  this.store.collection(ids.categories).doc(ids.leverage);



  getA: Observable<{id:string}[]> | undefined;
  title = 'ESSENCE';

  //leverageItemsList: Observable<string[]>;

  // Titles for all different ESSENCE categories, and example items
  // Use this as example untill we get database up and running
  leverage = ids.leverage;
  challenge = ids.challenge;
  problem = ids.problem; 
  prospect = ids.prospect;
  warrant = ids.warrant;
  backing = ids.backing;
  element = ids.element;
  architecture = ids.architecture;
  qualifier = ids.qualifier;
  rebuttal = ids.rebuttal;
  scenario = ids.scenario;
  feature = ids.feature;
  valueproposition = ids.valueproposition;

  leverageTitle: string = "Leverage";
  leverageItems: string[] = ["Touch screen", "Handoff", "GPS", "Calendar", "Mails", "Messages", "Accelometer", "Pulse", "Wifi", "Bluetooth"];
  challengeTitle: string = "Challenge";
  challengeItems: string[] = ["Improve Quality of Life(QoL) for citizens with affective disorders"];
  problemTitle: string = "Problem";
  problemItems: string[] = ["Acute depression is a common and serious threat to QoL"];
  prospectTitle: string = "Prospect";
  prospectItems: string[] = ["Psyche (TimePlace) - anticipating and alleviating acute depression"];
  warrantTitle: string = "Warrent";
  warrantItems: string[] = ["Early treatment may aleviate acute depression and self destructive behavior"];
  backingTitle: string = "Backing";
  backingItems: string[] = ["Inexpensive, popular platform. Extensible"];
  elementsTitle: string = "Elements";
  elementsItems: string[] = ["Platform tied with personality", "Citizen’s list of important locations","Calendar entries","User having a profile suggesting mood indicators", "Mental health kit(MHK)", "Acute depression period", "Professional and other caretakers"];
  architectureTitle: string = "Architecture"
  architectureItems: string[] = ["Digital diary module","Digital questionnaire module", "Anticipation module", "Context estimation module", "Context-aware alleviation module", "Sleep analysis module", "Physical activity monitor", "Social activity monitor"];
  qualifierTitle: string = "Qualification"
  qualifierItems: string[] = ["Only for light depressions"];
  rebuttalTitle: string = "Rebuttal"
  rebuttalItems: string[] = ["Still many can benifit from it"];
  scenariosTitle: string = "Scenarios";
  scenariosItems: string[] = ["Writing diary", "Answering the  questionnaire", "Experiencing acute depression", "Sleep", "Physical activity", "Social activity"];
  featuresTitle: string = "Features";
  featuresItems: string[] = ["Digital diary", "Questionnaire", "Trend analysis", "Status analysis", "Alleviation measures agree with context", "Measures selected opportunistically", "Sleep analysis", "Analysis of physical activity", "Analysis of social activity"];
  valuePropositionsTitle: string = "ValuePropositions";
  valuePropositionsItems: string[] = ["Anticipation supplemented with contextual data", "Contextual data used to optimize alleviation measure"];

  productView: string = "product";
  paradigmView: string = "paradigm";
  processView: string = "process";
  projectView: string = "project";

}
