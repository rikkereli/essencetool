import { Component, OnInit } from '@angular/core';
import { ProjectStage } from 'src/app/model/project';
import { CategoryService } from 'src/app/services/category.service';
import * as ids from '../../../assets/vars';
import * as routes from '../../../assets/routes';
import { ProjectService } from 'src/app/services/project.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model';

@Component({
  selector: 'app-ecology-object',
  templateUrl: './ecology-object.component.html',
  styleUrls: ['./ecology-object.component.scss']
})
export class EcologyObjectComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    public navbarService: NavbarService,
    private categoryService: CategoryService,

  ) { 
    navbarService.onProjectActivityPage = true;
    this.ecologyObject$ = categoryService.getCategory(ids.ecologyObject);
  }
  ecologyObject$: Observable<Category>;

  ngOnInit(): void {
  }

  description = "Generate potential ecology objects"; 
  nextActivity() {
    // Go to next activity in project
    this.projectService.updateProjectStage(routes.leveragePointActivity);
  }
}
