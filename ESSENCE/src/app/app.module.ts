import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryBoxComponent } from './components/utilities/category-box/category-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatToolbarModule} from '@angular/material/toolbar';
import { TextFieldModule} from '@angular/cdk/text-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryItemComponent } from './components/utilities/category-item/category-item.component';
import {MatIconModule} from '@angular/material/icon'
import { environment} from 'src/environments/environment';
import { AuthServiceService } from "./services/auth-service.service";
import { AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxLoadingModule } from 'ngx-loading';

import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'
import { AgGridModule } from 'ag-grid-angular';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CategoryOverviewComponent } from './components/utilities/category-overview/category-overview.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectsOverviewComponent } from './components/projects-overview/projects-overview.component';
import { ProjectDisplayItemComponent } from './components/utilities/project-display-item/project-display-item.component';
import { AutoGrowDirective } from './directives/auto-grow.directive';
import { ResizeService } from './services/resize.service';
import { CategoryItemDirective } from './directives/category-item.directive';
import { CategoryitemService } from './services/categoryitem.service';
import { CategoryItemButtonDirective } from './directives/category-item-button.directive';
import { ToogleActivityDirective } from './directives/toogle-activity.directive';
import { ChallengeDefinitionComponent } from './components/activities/challenge-definition/challenge-definition.component';
import { PreProjectComponent } from './components/activities/pre-project/pre-project.component';
import { EcologyObjectComponent } from './components/activities/ecology-object/ecology-object.component';
import { LeveragePointComponent } from './components/activities/leverage-point/leverage-point.component';
import { InitialProblemComponent } from './components/activities/initial-problem/initial-problem.component';
import { AxisAlignmentComponent } from './components/activities/axis-alignment/axis-alignment.component';
import { NextActivityComponent } from './components/utilities/next-activity/next-activity.component';
import { ProspectRepesentationGenerationComponent } from './components/activities/prospect-repesentation-generation/prospect-repesentation-generation.component';
import { ProspectRepesentationExpansionComponent } from './components/activities/prospect-repesentation-expansion/prospect-repesentation-expansion.component';
import { RstReviewComponent } from './components/activities/rst-review/rst-review.component';
import { NavbarService } from './services/navbar.service';
import { RstReviewCriteriaComponent } from './components/activities/rst-review-criteria/rst-review-criteria.component';
import { RstReviewCommentsComponent } from './components/activities/rst-review-comments/rst-review-comments.component';
import { RstReviewUpdateDiagramsComponent } from './components/activities/rst-review-update-diagrams/rst-review-update-diagrams.component';
@NgModule({
  declarations: [
    AppComponent,
    CategoryBoxComponent,
    CategoryItemComponent,
    CategoryOverviewComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    DashboardComponent,
    HomeComponent,
    ProfileComponent,
    ProjectsOverviewComponent,
    ProjectDisplayItemComponent,
    AutoGrowDirective,
    CategoryItemDirective,
    CategoryItemButtonDirective,
    ToogleActivityDirective,
    ChallengeDefinitionComponent,
    PreProjectComponent,
    EcologyObjectComponent,
    LeveragePointComponent,
    InitialProblemComponent,
    AxisAlignmentComponent,
    NextActivityComponent,
    ProspectRepesentationGenerationComponent,
    ProspectRepesentationExpansionComponent,
    RstReviewComponent,
    RstReviewCriteriaComponent,
    RstReviewCommentsComponent,
    RstReviewUpdateDiagramsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatDialogModule,
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
    ButtonsModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule
  ],
  providers: [AuthServiceService, [ResizeService], [CategoryitemService], [NavbarService]],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
