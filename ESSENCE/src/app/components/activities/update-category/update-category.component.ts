import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import * as routes from 'src/app/assets/routes';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryUpdateService } from 'src/app/services/category-update.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {

  constructor(
    public navbarService: NavbarService,
    public categoryService: CategoryService, 
    private router: Router, 
    public categoryUpdateService: CategoryUpdateService,
    public projectService: ProjectService
    ) { }

  ngOnInit(): void {
  }


  UpdateStage() {
    if(this.isInitialKnowledge){
      this.projectService.updateProjectStage(routes.checkKnowledge)
    }
  }
  
  GoToSelect() {
    this.router.navigate(["/dashboard/", routes.initialKnowledgeActivity]);
  }

  problemReasonable = false;
  leverageReasonable = false;
  solutionReasonable = false;
  rationaleReasonable = false;
  tacticReasonable = false;
  strategyReasonable = false;
  valuePropositionReasonable = false;
  featuresReasonable = false;
  innerEnvironmentReasonable = false;
  outerEnvironmentReasonable = false;
  scenariosReasonable = false;
  scopeReasonable = false;

  accept(category) {
    switch(category) {
      case "problem": {
        this.problemReasonable = true;
        break;
      }
      case "scope": {
        this.scopeReasonable = true;
        break;
      }
      case "scenarios": {
        this.scenariosReasonable = true;
        break;
      }
      case "features":  {
        this.featuresReasonable = true;
        break;
      }
      case "valuePropositions": {
        this.valuePropositionReasonable = true;
        break;
      }
      case "tactic": {
        this.tacticReasonable = true;
        break;
      }
      case "outerEnvironment": {
        this.outerEnvironmentReasonable = true;
        break;
      }
      case "innerEnvironment": {
        this.innerEnvironmentReasonable = true;
        break;
      }
      case "strategy": {
        this.strategyReasonable = true;
        break;
      }
      case "leverage": {
        this.leverageReasonable = true;
        break;
      }
      case "solution": {
        this.solutionReasonable = true;
        break;
      }
      case "rationale": {
        this.rationaleReasonable = true;
        break;
        
      }
     } 
  }

  get isInitialKnowledge() {
    return this.navbarService.currentPage.value === "initialKnowledge"
  }
}
