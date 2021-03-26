import { Component, OnInit } from '@angular/core';
import { ProjectStage } from 'src/app/model/project';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProjectService } from 'src/app/services/project.service';
import * as routes from '../../../assets/routes';

@Component({
  selector: 'app-axis-alignment',
  templateUrl: './axis-alignment.component.html',
  styleUrls: ['./axis-alignment.component.scss']
})
export class AxisAlignmentComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    public navbarService: NavbarService
    ) {}

  ngOnInit(): void {
  }

  nextActivity() {
    // Go to next activity in project
    this.projectService.updateProjectStage(routes.prospectRepresentationActivity);
  }
}
