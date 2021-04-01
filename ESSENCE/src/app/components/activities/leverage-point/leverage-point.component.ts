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
  selector: 'app-leverage-point',
  templateUrl: './leverage-point.component.html',
  styleUrls: ['./leverage-point.component.scss']
})
export class LeveragePointComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    public navbarService: NavbarService,
    private categoryService: CategoryService,

  ) { 
    navbarService.onProjectActivityPage = true;
    this.leveragePoint$ = categoryService.getCategory(ids.leveragePoint);
  }
  leveragePoint$: Observable<Category>;

  ngOnInit(): void {
  }

  nextActivity() {
    // Go to next activity in project
    this.projectService.updateProjectStage(routes.initialProblemActivity);
  }
}
