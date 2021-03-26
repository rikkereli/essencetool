import { Component } from '@angular/core';
import { CategoryBoxComponent } from './components/utilities/category-box/category-box.component'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {TextFieldModule} from '@angular/cdk/text-field';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as ids from './assets/vars';
import { map } from 'rxjs/operators';


export interface CategoryView {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "ESSENCE";
  constructor(private store: AngularFirestore){
    
  }

}
