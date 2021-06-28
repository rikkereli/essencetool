import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AppRoutingModule } from './app-routing.module';
import {MatSelectModule} from '@angular/material/select';
import { AppComponent } from './app.component';
import { CategoryBoxComponent } from './components/utilities/category-box/category-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule} from '@angular/material/toolbar';
import { TextFieldModule} from '@angular/cdk/text-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryItemComponent } from './components/utilities/category-item/category-item.component';
import {MatIconModule} from '@angular/material/icon'
import { environment} from 'src/environments/environment';
import { AuthService } from "./services/auth.service";
import { AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CategoryOverviewComponent } from './components/utilities/category-overview/category-overview.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectsOverviewComponent } from './components/projects-overview/projects-overview.component';
import { ProjectDisplayItemComponent } from './components/utilities/project-display-item/project-display-item.component';
import { AutoGrowDirective } from './directives/auto-grow.directive';
import { ResizeService } from './services/resize.service';
import { CategoryItemDirective } from './directives/category-item.directive';
import { CategoryitemService } from './services/categoryitem.service';
import { CategoryItemButtonDirective } from './directives/category-item-button.directive';
import { ToogleActivityDirective } from './directives/toogle-activity.directive';
import { NavbarService } from './services/navbar.service';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SwotitemComponent } from './components/utilities/swotitem/swotitem.component';
import { PcrtitemComponent } from './components/utilities/pcrtitem/pcrtitem.component';
import { ProspectScenarioQuadrantComponent } from './components/utilities/prospect-scenario-quadrant/prospect-scenario-quadrant.component';
import { PrintCategoryComponent } from './components/utilities/print-category/print-category.component';
import { PrintCategoryOverviewComponent } from './components/utilities/print-category-overview/print-category-overview.component';
import { SelectInitialKnowledgeComponent } from './components/activities/select-initial-knowledge/select-initial-knowledge.component';
import { UpdateCategoryComponent } from './components/activities/update-category/update-category.component';
import { SwotToolComponent } from './components/tools/swot-tool/swot-tool.component';
import { PcrtToolComponent } from './components/tools/pcrt-tool/pcrt-tool.component';
import { ScenarioToolComponent } from './components/tools/scenario-tool/scenario-tool.component';
import { CateogryItemDisplayDirective } from './directives/cateogry-item-display.directive';
import { ConnectButtonDirective } from './directives/connect-button.directive';
import { QuestionKnowledgeComponent } from './components/activities/question-knowledge/question-knowledge.component';
import { CompareToolComponent } from './components/tools/compare-tool/compare-tool.component';
import {MatTabsModule} from '@angular/material/tabs';


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
    ProfileComponent,
    ProjectsOverviewComponent,
    ProjectDisplayItemComponent,
    AutoGrowDirective,
    CategoryItemDirective,
    CategoryItemButtonDirective,
    ToogleActivityDirective,
    SwotitemComponent,
    PcrtitemComponent,
    ProspectScenarioQuadrantComponent,
    PrintCategoryComponent,
    PrintCategoryOverviewComponent,
    SelectInitialKnowledgeComponent,
    UpdateCategoryComponent,
    SwotToolComponent,
    PcrtToolComponent,
    ScenarioToolComponent,
    CateogryItemDisplayDirective,
    ConnectButtonDirective,
    QuestionKnowledgeComponent,
    CompareToolComponent
  ],
  imports: [
    MatTabsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    DragDropModule,
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
    MatSelectModule, 
    ButtonsModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    HttpClientModule,
    MatInputModule
  ],
  providers: [AuthService, [ResizeService], [CategoryitemService], [NavbarService]],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
