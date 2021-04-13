import { Component, OnInit } from '@angular/core';
import { ProjectStage } from 'src/app/model/project';
import { CategoryService } from 'src/app/services/category.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProspectScenarioService } from 'src/app/services/prospect-scenario.service';
import * as routes from '../../../assets/routes';

@Component({
  selector: 'app-axis-alignment',
  templateUrl: './axis-alignment.component.html',
  styleUrls: ['./axis-alignment.component.scss']
})
export class AxisAlignmentComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    public navbarService: NavbarService,
    public categoryService: CategoryService,
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

  ngOnInit(): void {
    this.categoryService.getSubCategory('problem').subscribe(problem => 
      {
        this.problem =problem[0].text;
      });
  }

  verticalProblemStart = "";
  verticalProblemEnd = "";
  verticalSolutionStart = "";
  verticalSolutionEnd = "";
  HorizontalProblemStart = "";
  HorizontalProblemEnd = "";
  HorizontalSolutionStart = "";
  HorizontalSolutionEnd = "";

  problemTooltip = "Problem";
  solutionTooltip = "Solution";

  problem = "Loading challenge...";

  
  updateAxis(event) {
    var obj = {};
    var axis = event.target.attributes.id.nodeValue;
    var value = event.target.value;
    obj[axis] = value;
    this.prospectScenarioService.setProspectAxis(obj)
  }
}
