import { Component, OnInit } from '@angular/core';
import { ProjectStage } from 'src/app/model/project';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProjectService } from 'src/app/services/project.service';
import * as routes from '../../../assets/routes';
import * as ids from '../../../assets/vars';

@Component({
  selector: 'app-rst-review-update-diagrams',
  templateUrl: './rst-review-update-diagrams.component.html',
  styleUrls: ['./rst-review-update-diagrams.component.scss']
})
export class RstReviewUpdateDiagramsComponent implements OnInit {

  constructor(public projectService: ProjectService, public navbarService: NavbarService) { }

  ngOnInit(): void {
  }

  nextActivity() {
    this.projectService.updateProjectStage(routes.sprintInitiationActivity);
  }
  leverage = ids.leverage;
  challenge = ids.challenge;
  problem = ids.problem; 
  prospect = ids.prospect;
  warrant = ids.warrant;
  backing = ids.backing;
  element = ids.ecology;
  architecture = ids.architecture;
  qualifier = ids.qualifier;
  rebuttal = ids.rebuttal;
  scenario = ids.scenario;
  feature = ids.feature;
  valueproposition = ids.valueproposition;
  tactic = ids.tactic;
  rationale = ids.rationale;
  strategy = ids.strategy;
  resolution = ids.resolution;
  qualification = ids.qualification;
  problematic = ids.problematic;
}
