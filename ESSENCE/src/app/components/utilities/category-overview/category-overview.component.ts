import { Component, OnInit } from '@angular/core';
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
  constructor(
    private store: AngularFirestore,
    private route: ActivatedRoute,
    media: MediaObserver,
    public categoryService: CategoryService, 

    ) { 
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
