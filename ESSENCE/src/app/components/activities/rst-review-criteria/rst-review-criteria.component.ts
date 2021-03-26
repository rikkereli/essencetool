import { Component, OnInit } from '@angular/core';
import { ProjectStage } from 'src/app/model/project';
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

  constructor(public projectService: ProjectService, public navbarService: NavbarService) { }

  ngOnInit(): void {
  }

  updateCategories() {
    this.projectService.updateProjectStage(routes.RSTReviewupdateDiagramActivity);
  }
  tactic = ids.tactic;
  rationale = ids.rationale;
  strategy = ids.strategy;

}
