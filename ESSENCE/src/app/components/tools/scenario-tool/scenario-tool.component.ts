import { Component, OnInit } from '@angular/core';
import { ProspectScenarioQuadrant } from 'src/app/model/prospectScenarioQuadrant';
import { CategoryService } from 'src/app/services/category.service';
import { FirestoreReferencesService } from 'src/app/services/firestore-references.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProspectScenarioService } from 'src/app/services/prospect-scenario.service';

@Component({
  selector: 'app-scenario-tool',
  templateUrl: './scenario-tool.component.html',
  styleUrls: ['./scenario-tool.component.scss']
})
export class ScenarioToolComponent implements OnInit {

  constructor(
    public navbarService: NavbarService,
    public categoryService: CategoryService,
    public prospectScenarioService: ProspectScenarioService,
    public firestoreReferenceService: FirestoreReferencesService
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
    selectedProspect: ProspectScenarioQuadrant;

  ngOnInit(): void {
    this.firestoreReferenceService.getCategory('problem').valueChanges().subscribe(problem => {
      this.problem = problem[0].text;
    })

      this.prospectScenarioService.getSelectedProspectQuadrant().subscribe(prospect =>
        {
          if(prospect) {
            this.selectedProspect = <ProspectScenarioQuadrant>prospect[0];
          } 
        })
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

  problem = "Loading problem...";

  updateAxis(event, axis) {
    var obj = {};
    obj[axis] = event.target.value;
    this.prospectScenarioService.setProspectAxis(obj)
  }

}
