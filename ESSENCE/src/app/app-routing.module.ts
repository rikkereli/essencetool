//npm ci && npm run buildimport 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryBoxComponent } from './category-box/category-box.component';
import { CategoryOverviewComponent } from './category-overview/category-overview.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DiagramOverviewComponent } from './components/diagram-overview/diagram-overview.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import {AuthGuard} from './shared/guard/auth.guard';
import { LoggedinGuard } from './shared/guard/loggedin.guard';

const routes: Routes = [
  { path: '', redirectTo:'/dashboard', pathMatch: 'full'},
  { path: 'sign-in', component:SignInComponent, canActivate: [LoggedinGuard]},
  { path: 'register-user', component:SignUpComponent, canActivate: [LoggedinGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [LoggedinGuard]},
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [LoggedinGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children : [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'diagramTool/:diagramId', component: CategoryOverviewComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'diagramOverview', component: DiagramOverviewComponent, canActivate: [AuthGuard] }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
