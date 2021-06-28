//npm ci && npm run buildimport 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryOverviewComponent } from './components/utilities/category-overview/category-overview.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectsOverviewComponent } from './components/projects-overview/projects-overview.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import {AuthGuard} from './shared/guard/auth.guard';
import * as routeNames from './assets/routes';
import { LoggedinGuard } from './shared/guard/loggedin.guard';
import { SelectInitialKnowledgeComponent } from './components/activities/select-initial-knowledge/select-initial-knowledge.component';
import { UpdateCategoryComponent } from './components/activities/update-category/update-category.component';
import { QuestionKnowledgeComponent } from './components/activities/question-knowledge/question-knowledge.component';

const routes: Routes = [
  //{ path: '**', redirectTo:'/dashboard'},
  { path: '', redirectTo:'/dashboard', pathMatch: 'full'},
  { path: 'sign-in', component:SignInComponent, canActivate: [LoggedinGuard]},
  { path: 'register-user', component:SignUpComponent, canActivate: [LoggedinGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [LoggedinGuard]},
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [LoggedinGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children : [
    { path: '', component: ProjectsOverviewComponent},
    { path: 'diagramTool/:diagramId', component: CategoryOverviewComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'diagramOverview', component: CategoryOverviewComponent},
    { path: routeNames.updateCategory, component: UpdateCategoryComponent},
    { path: routeNames.initialKnowledgeActivity, component: SelectInitialKnowledgeComponent},
    { path: routeNames.checkKnowledge, component: QuestionKnowledgeComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
