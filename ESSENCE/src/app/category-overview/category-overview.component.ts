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
import { ActivatedRoute } from '@angular/router';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
@Component({
  selector: 'app-category-overview',
  templateUrl: './category-overview.component.html',
  styleUrls: ['./category-overview.component.scss']
})
export class CategoryOverviewComponent implements OnInit {
  private sub:any;
  id: string;
  constructor(
    private store: AngularFirestore,
    private route: ActivatedRoute,
    media: MediaObserver
    ) { 
      this.media$ = media.asObservable();
    //this.store.collection(ids.leverage).doc('A').update({a: "AAA"});
    var str =  ids.leverage 
    //let leverageCol = this.store.collection(ids.leverage).snapshotChanges().subscribe((querySnapshot)=> {querySnapshot.forEach((doc) => {})});
    //leverageCol.get().then((querySnapshot) => {

    //})
    //this.leverageItemsList = this.store.collection('leverage').valueChanges({});

    this.leverage$ = store.collection<CategoryView>(ids.leverage).doc("view").valueChanges();
  }


  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['diagramId'];

    })
  }
  
  
  leverage$: Observable<CategoryView>;
  leverageCategoryRef =  this.store.collection(ids.categories).doc(ids.leverage);



  getA: Observable<{id:string}[]> | undefined;
  title = 'ESSENCE';
  media$: Observable<MediaChange[]>;

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
  tactic = ids.tactic;
  rationale = ids.rationale;
  strategy = ids.strategy;

}
