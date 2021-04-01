import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProjectService } from 'src/app/services/project.service';
import * as routes from '../../../assets/routes';


@Component({
  selector: 'app-sprint-work',
  templateUrl: './sprint-work.component.html',
  styleUrls: ['./sprint-work.component.scss']
})
export class SprintWorkComponent implements OnInit {

  constructor(public projectService: ProjectService,public navbarService: NavbarService) { }

  ngOnInit(): void {
  }

  nextActivity() {
    this.projectService.updateProjectStage(routes.RSTReviewActivity);
  }

}
