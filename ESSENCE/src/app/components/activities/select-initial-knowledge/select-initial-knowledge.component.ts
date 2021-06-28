import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import * as routes from 'src/app/assets/routes';
import { Categories, CategoryOptions } from 'src/app/assets/categories';
import { CategoryUpdateService, ViewSelection } from 'src/app/services/category-update.service';


@Component({
  selector: 'app-select-initial-knowledge',
  templateUrl: './select-initial-knowledge.component.html',
  styleUrls: ['./select-initial-knowledge.component.scss']
})
export class SelectInitialKnowledgeComponent implements OnInit {

  constructor(
    public navbarService: NavbarService, 
    private router: Router,
    public categoryUpdateService: CategoryUpdateService
    ) { }
  

  categoriesInfo: Categories = new Categories();
  ngOnInit(): void {
  }


  problemTooltip = "Select the problem category if you already have an idea of the problem you want to solve";
  technologyTooltip = "Select the technology category if you already have an idea of some technology you want to be a part of the solution";
  solutionTooltip = "Select the solution category if you already have a solution in mind"; 
  outerEnvironment = "Select the outer environment category if you know what your solution will interface with";
  innerEnvironment = "Select the inner environment category if you know what "


  paradigmTooltip = "Select this if you want to use the context as a starting point for the project. This could either be selecting the domain, scenarios or outer environment of the project.";

  productTooltip = "Select this if yout want to use the solution implementation as a starting point. This could either be some technology you want to leverage, some features you want the solution to have, or the inner environment of the solution.";

  projectTooltip = "Select this if you want to use the conceptual solution as a starting point, either by defining the value the soultion should provide, what the solution should be or the problem that should be solved."

  processTooltip = "Select this if you want the acceptance criteria to be the starting point of the "

  SelectView(view: ViewSelection) {
    this.categoryUpdateService.selectedView = view;
  }
  SelectCategory(category: CategoryOptions) {
    this.categoryUpdateService.currentlyEditCategory.next(category);
    this.router.navigate(["/dashboard/", routes.updateCategory]);
  }
  
}
