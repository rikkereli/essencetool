import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from 'src/app/model/project';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProjectService } from 'src/app/services/project.service';
import * as routes from '../../../assets/routes';

@Component({
  selector: 'app-project-display-item',
  templateUrl: './project-display-item.component.html',
  styleUrls: ['./project-display-item.component.scss']
})
export class ProjectDisplayItemComponent implements OnInit {

  @Input() diagramID; 
  constructor(
    private modalService: NgbModal,
    public authService: AuthService, 
    public categoryService: CategoryService,
    private projectService: ProjectService,
    public router: Router
  ) { }

  project$: Observable<Project>;
  ngOnInit(): void {
    this.project$ = this.projectService.getProject(this.diagramID).valueChanges().pipe(
      map(project => {
        return new Project(project.projectName, project.projectStage);
      })
      
    );
    this.projectService.getProject(this.diagramID).valueChanges().subscribe(A=> {

    })

  }
  // When diagram is clicked, open the diagram 
  onDiagramClicked() {
    this.router.navigate([routes.diagramTool]);
  }

  // When a project is selected, set the project ID in local storage to 
  updateToLocalStorage() {
    localStorage.setItem('project', JSON.stringify(this.diagramID));
    this.projectService.setCurrentProject(this.diagramID);
  }
  deleteProject(content) {
    this.modalService.open(content, {ariaLabelledBy:"modal-basic-title"}).result.then((res)=>
      {
        if(res === "Yes") {
          this.projectService.deleteProject(this.diagramID);
        }
      }
    );
  }
}