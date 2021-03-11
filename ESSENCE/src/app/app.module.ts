import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryBoxComponent } from './category-box/category-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {TextFieldModule} from '@angular/cdk/text-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryItemComponent } from './category-item/category-item.component';

import {environment} from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { CategoryItemListComponent } from './category-item-list/category-item-list.component';
import { NgxLoadingModule } from 'ngx-loading';

import { AgGridModule } from 'ag-grid-angular';
import { CategoryOverviewComponent } from './category-overview/category-overview.component';
import { ProspectScenarioComponent } from './prospect-scenario/prospect-scenario.component';
@NgModule({
  declarations: [
    AppComponent,
    CategoryBoxComponent,
    CategoryItemComponent,
    CategoryItemListComponent,
    CategoryOverviewComponent,
    ProspectScenarioComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatToolbarModule,
    TextFieldModule,
    NgbModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
