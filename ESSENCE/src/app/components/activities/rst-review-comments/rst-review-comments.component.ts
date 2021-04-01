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
  selector: 'app-rst-review-comments',
  templateUrl: './rst-review-comments.component.html',
  styleUrls: ['./rst-review-comments.component.scss']
})
export class RstReviewCommentsComponent implements OnInit {

  constructor(public projectService: ProjectService,public navbarService: NavbarService, public categoryService: CategoryService) { 
    this.comments$ = categoryService.getCategory(ids.comments);
  }

  ngOnInit(): void {
  }
  comments$: Observable<Category>;
  generateCriteria() {
    this.projectService.updateProjectStage(routes.RSTReviewGenerateCriteriaActivity);
  }

}
