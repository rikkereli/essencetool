import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model';
import { ProjectStage } from 'src/app/model/project';
import { ProspectScenarioQuadrant } from 'src/app/model/prospectScenarioQuadrant';
import { CategoryService } from 'src/app/services/category.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProspectScenarioService } from 'src/app/services/prospect-scenario.service';
import * as routes from '../../../assets/routes';
import * as ids from '../../../assets/vars';
@Component({
  selector: 'app-prospect-repesentation-expansion',
  templateUrl: './prospect-repesentation-expansion.component.html',
  styleUrls: ['./prospect-repesentation-expansion.component.scss']
})
export class ProspectRepesentationExpansionComponent implements OnInit {

  constructor(private projectService: ProjectService,
    public navbarService: NavbarService,
    public prospectScenarioService: ProspectScenarioService,
    private categoryService: CategoryService
    ) { 
      navbarService.onProjectActivityPage = true;
      this.leverage$ = this.categoryService.getCategory(ids.leverage);
      this.challenge$ = this.categoryService.getCategory(ids.challenge);
      this.problem$ = this.categoryService.getCategory(ids.problem); 
      this.prospect$ = this.categoryService.getCategory(ids.prospect);
      this.warrant$ = this.categoryService.getCategory(ids.warrant);
      this.backing$ = this.categoryService.getCategory(ids.backing);
      this.element$ = this.categoryService.getCategory(ids.ecology);
      this.architecture$ = this.categoryService.getCategory(ids.architecture);
      this.qualifier$ = this.categoryService.getCategory(ids.qualifier);
      this.rebuttal$ = this.categoryService.getCategory(ids.rebuttal);
      this.scenario$ = this.categoryService.getCategory(ids.scenario);
      this.feature$ = this.categoryService.getCategory(ids.feature);
      this.valueproposition$ = this.categoryService.getCategory(ids.valueproposition);
      this.tactic$ = this.categoryService.getCategory(ids.tactic);
      this.rationale$ = this.categoryService.getCategory(ids.rationale);
      this.strategy$ = this.categoryService.getCategory(ids.strategy);
      this.resolution$ = this.categoryService.getCategory(ids.resolution);
      this.qualification$ = this.categoryService.getCategory(ids.qualification);
      this.problematic$ = this.categoryService.getCategory(ids.problematic);
  
    }

  ngOnInit(): void {
    this.prospectScenarioService.getSelectedProspectQuadrant().subscribe(prospect =>
      {
        if(prospect) {
          this.selectedProspect = <ProspectScenarioQuadrant>prospect[0];
        } 
      }
    );
  }
  leverage$: Observable<Category>;
  challenge$:  Observable<Category>;
  problem$:  Observable<Category>;
  prospect$:  Observable<Category>;
  warrant$:  Observable<Category>;
  backing$:  Observable<Category>;
  element$:  Observable<Category>;
  architecture$:  Observable<Category>;
  qualifier$:  Observable<Category>;
  rebuttal$:  Observable<Category>;
  scenario$:  Observable<Category>;
  feature$:  Observable<Category>;
  valueproposition$:  Observable<Category>;
  tactic$:  Observable<Category>;
  rationale$:  Observable<Category>;
  strategy$:  Observable<Category>;
  resolution$:  Observable<Category>;
  qualification$:  Observable<Category>;
  problematic$:  Observable<Category>;

  selectedProspect: ProspectScenarioQuadrant;
  nextActivity() {
    // Go to next activity in project
    this.projectService.updateProjectStage(routes.sprintInitiationActivity);
  }

}
