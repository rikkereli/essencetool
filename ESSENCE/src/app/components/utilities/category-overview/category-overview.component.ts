import { Component, OnInit } from '@angular/core';
import { CategoryBoxComponent } from '../category-box/category-box.component'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {TextFieldModule} from '@angular/cdk/text-field';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as ids from '../../../assets/vars';
import { map } from 'rxjs/operators';
import { CategoryView } from '../../../app.component';
import { ActivatedRoute } from '@angular/router';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/model';

@Component({
  selector: 'app-category-overview',
  templateUrl: './category-overview.component.html',
  styleUrls: ['./category-overview.component.scss']
})
export class CategoryOverviewComponent implements OnInit {
  private sub:any;
  id: string;

  leverage$: Observable<Category>;
  challenge$:  Observable<Category>;
  problem$:  Observable<Category>;
  prospect$:  Observable<Category>;
  warrant$:  Observable<Category>;
  backing$:  Observable<Category>;
  element$:  Observable<Category>;
  architecture$:  Observable<Category>;
  qualifier$:  Observable<Category>;
  rebuttal$:  Observable<Category>;
  scenario$:  Observable<Category>;
  feature$:  Observable<Category>;
  valueproposition$:  Observable<Category>;
  tactic$:  Observable<Category>;
  rationale$:  Observable<Category>;
  strategy$:  Observable<Category>;
  resolution$:  Observable<Category>;
  qualification$:  Observable<Category>;
  problematic$:  Observable<Category>;
  constructor(
    private store: AngularFirestore,
    private route: ActivatedRoute,
    media: MediaObserver,
    public categoryService: CategoryService, 

    ) { 
      this.media$ = media.asObservable();
    //this.store.collection(ids.leverage).doc('A').update({a: "AAA"});
    var str =  ids.leverage 
    this.leverage$ = this.categoryService.getCategory(ids.leverage);
    this.challenge$ = this.categoryService.getCategory(ids.challenge);
    this.problem$ = this.categoryService.getCategory(ids.problem); 
    this.prospect$ = this.categoryService.getCategory(ids.prospect);
    this.warrant$ = this.categoryService.getCategory(ids.warrant);
    this.backing$ = this.categoryService.getCategory(ids.backing);
    this.element$ = this.categoryService.getCategory(ids.ecology);
    this.architecture$ = this.categoryService.getCategory(ids.architecture);
    this.qualifier$ = this.categoryService.getCategory(ids.qualifier);
    this.rebuttal$ = this.categoryService.getCategory(ids.rebuttal);
    this.scenario$ = this.categoryService.getCategory(ids.scenario);
    this.feature$ = this.categoryService.getCategory(ids.feature);
    this.valueproposition$ = this.categoryService.getCategory(ids.valueproposition);
    this.tactic$ = this.categoryService.getCategory(ids.tactic);
    this.rationale$ = this.categoryService.getCategory(ids.rationale);
    this.strategy$ = this.categoryService.getCategory(ids.strategy);
    this.resolution$ = this.categoryService.getCategory(ids.resolution);
    this.qualification$ = this.categoryService.getCategory(ids.qualification);
    this.problematic$ = this.categoryService.getCategory(ids.problematic);
    //let leverageCol = this.store.collection(ids.leverage).snapshotChanges().subscribe((querySnapshot)=> {querySnapshot.forEach((doc) => {})});
    //leverageCol.get().then((querySnapshot) => {

    //})
    //this.leverageItemsList = this.store.collection('leverage').valueChanges({});
  }


  ngOnInit(): void {

  }
  getA: Observable<{id:string}[]> | undefined;
  title = 'ESSENCE';
  media$: Observable<MediaChange[]>;

  //leverageItemsList: Observable<string[]>;

  // Titles for all different ESSENCE categories, and example items
  // Use this as example untill we get database up and running

  

}
