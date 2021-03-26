import { Component, OnInit } from '@angular/core';
import { ProjectStage } from 'src/app/model/project';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProjectService } from 'src/app/services/project.service';
import * as routes from '../../../assets/routes';

@Component({
  selector: 'app-rst-review-comments',
  templateUrl: './rst-review-comments.component.html',
  styleUrls: ['./rst-review-comments.component.scss']
})
export class RstReviewCommentsComponent implements OnInit {

  constructor(public projectService: ProjectService,public navbarService: NavbarService) { }

  ngOnInit(): void {
  }
  comments = "comments";
  generateCriteria() {
    this.projectService.updateProjectStage(routes.RSTReviewGenerateCriteriaActivity);

  }

}
