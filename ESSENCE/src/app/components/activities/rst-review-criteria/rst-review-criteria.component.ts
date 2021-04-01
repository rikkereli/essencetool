import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model';
import { ProjectStage } from 'src/app/model/project';
import { CategoryService } from 'src/app/services/category.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProjectService } from 'src/app/services/project.service';
import * as routes from '../../../assets/routes';
import * as ids from '../../../assets/vars';

@Component({
  selector: 'app-rst-review-criteria',
  templateUrl: './rst-review-criteria.component.html',
  styleUrls: ['./rst-review-criteria.component.scss']
})
export class RstReviewCriteriaComponent implements OnInit {

  constructor(public projectService: ProjectService, public navbarService: NavbarService, public categoryService: CategoryService) { 
    this.tactic$ = this.categoryService.getCategory(ids.tactic);
    this.rationale$ = this.categoryService.getCategory(ids.rationale);
    this.strategy$ = this.categoryService.getCategory(ids.strategy);
  }

  ngOnInit(): void {
  }

  updateCategories() {
    this.projectService.updateProjectStage(routes.RSTReviewupdateDiagramActivity);
  }
  tactic$: Observable<Category>;
  rationale$: Observable<Category>;
  strategy$: Observable<Category>;

}
