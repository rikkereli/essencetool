import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, ActivatedRouteSnapshot, ActivationEnd, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { Page } from '../model/page';
import { Project } from '../model/project';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  currentProject: Subscription = new Subscription(); 
  currentPage: BehaviorSubject<string> = new BehaviorSubject("dashboard");
  currentRoute;
  onProjectActivityPage = false;
  onProfile = false;
  onProjects = false;
  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private projectService: ProjectService
    ) { 
      // We should subscribe to the current project so that we can navigate according to the project stage
      this.projectService.currentProject.subscribe(project => {
        // If we change the project, we should always unsubscribe
        this.currentProject.unsubscribe();
        // If we are entering a new project, we should subscribe to that project 

        if(project === "projects") {
          // If empty project, we should set that we are not in a project
          this.onProjectActivityPage = false;
          this.currentTitle = "Projects"
          this.currentPage.next("projects");
          this.onProjects = true;
          this.onProfile = false;
        }
        else if(project === "profile") {
          this.onProjectActivityPage = false;
          this.currentTitle = "Profile"
          this.currentPage.next("profile");
          this.onProjects = false;
          this.onProfile = true;
        }
        // If we did not navigate to projects or profile, we navigated to a project
        else
        {
          this.onProjectActivityPage = true;
          this.onProfile = false;
          this.onProjects = false;
          // If we are not in any project, we should stop listening to subscriptions
          this.currentProject = this.firestore.collection("diagrams").doc<Project>(project).valueChanges().subscribe(details => {
            // If project stage changes, navigate to page
            router.navigate(['/dashboard/'+details.projectStage]);
            this.currentPage.next(details.projectStage);
            // Update current title for project
            this.currentTitle = 'Project "' + details.projectName + '"';
          })
        }
      })
      // Get details when currentpage changes
      this.currentPage.subscribe(page => {
        this.firestore.collection('pages').doc<Page>(page).valueChanges().subscribe(
          help => 
          this.currentPageDetails = help);
      })
  }
  currentPageDetails: Page = new Page();
  currentTitle: string = "";
  getHelpFromCurrentSite() {
  }
    // Gets the current project ID from localstorage
    getCurrentProject() {
      return JSON.parse(localStorage.getItem('project'));
    }
}
