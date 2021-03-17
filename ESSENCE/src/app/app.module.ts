import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryBoxComponent } from './category-box/category-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatToolbarModule} from '@angular/material/toolbar';
import { TextFieldModule} from '@angular/cdk/text-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryItemComponent } from './category-item/category-item.component';

import { environment} from 'src/environments/environment';
import { AuthServiceService } from "./services/auth-service.service";
import { AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";

import { FlexLayoutModule } from '@angular/flex-layout';
import { CategoryItemListComponent } from './category-item-list/category-item-list.component';
import { NgxLoadingModule } from 'ngx-loading';

import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'
import { AgGridModule } from 'ag-grid-angular';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CategoryOverviewComponent } from './category-overview/category-overview.component';
import { ProspectScenarioComponent } from './prospect-scenario/prospect-scenario.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DiagramOverviewComponent } from './components/diagram-overview/diagram-overview.component';
import { DiagramDisplayItemComponent } from './components/diagram-display-item/diagram-display-item.component';
import { AutoGrowDirective } from './directives/auto-grow.directive';
import { ResizeService } from './services/resize.service';
@NgModule({
  declarations: [
    AppComponent,
    CategoryBoxComponent,
    CategoryItemComponent,
    CategoryItemListComponent,
    CategoryOverviewComponent,
    ProspectScenarioComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    DashboardComponent,
    HomeComponent,
    ProfileComponent,
    DiagramOverviewComponent,
    DiagramDisplayItemComponent,
    AutoGrowDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatToolbarModule,
    TextFieldModule,
    NgbModule,
    FlexLayoutModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MDBBootstrapModule.forRoot(),
    NavbarModule, 
    WavesModule, 
    ButtonsModule

  ],
  providers: [AuthServiceService],
  bootstrap: [AppComponent, [ResizeService]]
})
export class AppModule { 
}
