import { Component, OnInit } from '@angular/core';
import { ProjectStage } from 'src/app/model/project';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProjectService } from 'src/app/services/project.service';
import * as routes from '../../../assets/routes';

@Component({
  selector: 'app-rst-review',
  templateUrl: './rst-review.component.html',
  styleUrls: ['./rst-review.component.scss']
})
export class RstReviewComponent implements OnInit {

  constructor(
    public navbarService: NavbarService,
    public projectService: ProjectService) { }

  ngOnInit(): void {
  }

  startReview() {
    this.projectService.updateProjectStage(routes.RSTReviewGetCommentsActivity);
  }

}
