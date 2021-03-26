import { Component, OnInit } from '@angular/core';
import { ProjectStage } from 'src/app/model/project';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProjectService } from 'src/app/services/project.service';
import * as routes from '../../../assets/routes';

@Component({
  selector: 'app-prospect-repesentation-expansion',
  templateUrl: './prospect-repesentation-expansion.component.html',
  styleUrls: ['./prospect-repesentation-expansion.component.scss']
})
export class ProspectRepesentationExpansionComponent implements OnInit {

  constructor(private projectService: ProjectService,
    public navbarService: NavbarService
    ) { 
      navbarService.onProjectActivityPage = true;
    }

  ngOnInit(): void {
  }

  nextActivity() {
    // Go to next activity in project
    this.projectService.updateProjectStage(routes.RSTReviewActivity);
  }

}
