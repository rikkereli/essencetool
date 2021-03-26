import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects-overview',
  templateUrl: './projects-overview.component.html',
  styleUrls: ['./projects-overview.component.scss']
})
// Display all available diagrams for user 
// Be able to add new diagram
export class ProjectsOverviewComponent implements OnInit {

  constructor(
    public authService: AuthServiceService, 
    public categoryService: CategoryService,
    public projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    // Get available diagrams
  }
  // Create new project if enter key is down
  keyDown(event) {
    if(event.key === 'Enter') {
      this.createNewProject(event.target.value);
    }
  }
  createNewProject(name: string) {
    // Use the service to add a new project with desired name
    this.projectService.addNewProject(name);
  }
}
