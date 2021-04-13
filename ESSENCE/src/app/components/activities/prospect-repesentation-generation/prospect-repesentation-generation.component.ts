import { Component, OnInit } from '@angular/core';
import { ProjectStage } from 'src/app/model/project';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProspectScenarioService } from 'src/app/services/prospect-scenario.service';
import * as routes from '../../../assets/routes';

@Component({
  selector: 'app-prospect-repesentation-generation',
  templateUrl: './prospect-repesentation-generation.component.html',
  styleUrls: ['./prospect-repesentation-generation.component.scss']
})
export class ProspectRepesentationGenerationComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    public navbarService: NavbarService,
    public prospectScenarioService: ProspectScenarioService
    ) {
      this.prospectScenarioService.getProspectAxis().subscribe(
        project => {
          if(project.verticalProblemStart) {
            this.verticalProblemStart = project.verticalProblemStart
          }
          if(project.verticalProblemEnd) {
            this.verticalProblemEnd = project.verticalProblemEnd;
          }
          if(project.verticalSolutionStart){
            this.verticalSolutionStart = project.verticalSolutionStart
          }
          if(project.verticalSolutionEnd) {
            this.verticalSolutionEnd = project.verticalSolutionEnd
          }
          if(project.HorizontalProblemStart) {
            this.HorizontalProblemStart = project.HorizontalProblemStart
          }
          if(project.HorizontalProblemEnd) {
            this.HorizontalProblemEnd = project.HorizontalProblemEnd
          }
          if(project.HorizontalSolutionStart){
            this.HorizontalSolutionStart = project.HorizontalSolutionStart
          }
          if(project.HorizontalSolutionEnd) {
            this.HorizontalSolutionEnd = project.HorizontalSolutionEnd
          }
        }
      )
    }

  verticalProblemStart = "";
  verticalProblemEnd = "";
  verticalSolutionStart = "";
  verticalSolutionEnd = "";
  HorizontalProblemStart = "";
  HorizontalProblemEnd = "";
  HorizontalSolutionStart = "";
  HorizontalSolutionEnd = "";


  ngOnInit(): void {
  }
}
