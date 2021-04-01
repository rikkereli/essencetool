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
import { ChallengeDefinitionComponent } from './components/activities/challenge-definition/challenge-definition.component';
import { PreProjectComponent } from './components/activities/pre-project/pre-project.component';
import { EcologyObjectComponent } from './components/activities/ecology-object/ecology-object.component';
import { LeveragePointComponent } from './components/activities/leverage-point/leverage-point.component';
import { InitialProblemComponent } from './components/activities/initial-problem/initial-problem.component';
import { AxisAlignmentComponent } from './components/activities/axis-alignment/axis-alignment.component';
import { RstReviewComponent } from './components/activities/rst-review/rst-review.component';
import { ProspectRepesentationGenerationComponent } from './components/activities/prospect-repesentation-generation/prospect-repesentation-generation.component';
import { ProspectRepesentationExpansionComponent } from './components/activities/prospect-repesentation-expansion/prospect-repesentation-expansion.component';
import { RstReviewCommentsComponent } from './components/activities/rst-review-comments/rst-review-comments.component';
import { RstReviewCriteriaComponent } from './components/activities/rst-review-criteria/rst-review-criteria.component';
import { RstReviewUpdateDiagramsComponent } from './components/activities/rst-review-update-diagrams/rst-review-update-diagrams.component';
import { SprintInitiationComponent } from './components/activities/sprint-initiation/sprint-initiation.component';
import { SprintWorkComponent } from './components/activities/sprint-work/sprint-work.component';

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
    { path: routeNames.challengeDetectedActivity, component: ChallengeDefinitionComponent},
    { path: routeNames.ecologyObjectActivity, component: EcologyObjectComponent},
    { path: routeNames.leveragePointActivity, component: LeveragePointComponent},
    { path: routeNames.initialProblemActivity, component: InitialProblemComponent},
    { path: routeNames.axixAlignmentActivity, component: AxisAlignmentComponent},
    { path: routeNames.RSTReviewActivity, component: RstReviewComponent},
    { path: routeNames.prospectRepresentationActivity, component: ProspectRepesentationGenerationComponent},
    { path: routeNames.prospectRepresentationExpansionActivity, component: ProspectRepesentationExpansionComponent},
    { path: routeNames.RSTReviewGetCommentsActivity, component: RstReviewCommentsComponent},
    { path: routeNames.RSTReviewGenerateCriteriaActivity, component: RstReviewCriteriaComponent},
    { path: routeNames.RSTReviewupdateDiagramActivity, component: RstReviewUpdateDiagramsComponent},
    { path: routeNames.sprintInitiationActivity, component: SprintInitiationComponent},
    { path: routeNames.sprintWorkActivity, component: SprintWorkComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
