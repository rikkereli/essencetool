import { Component, OnInit } from '@angular/core';
import { ProjectStage } from 'src/app/model/project';
import { CategoryService } from 'src/app/services/category.service';
import * as ids from '../../../assets/vars';
import * as routes from '../../../assets/routes';
import { ProjectService } from 'src/app/services/project.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { Observable } from 'rxjs';
import { Category, CategoryItem, Status } from 'src/app/model';
import { CategoryitemService } from 'src/app/services/categoryitem.service';
import { CategoryBoxService } from 'src/app/services/category-box.service';
import { FirestoreReferencesService } from 'src/app/services/firestore-references.service';
import { Swotitem } from 'src/app/model/swotItem';

@Component({
  selector: 'app-ecology-object',
  templateUrl: './ecology-object.component.html',
  styleUrls: ['./ecology-object.component.scss'], 
  providers: [CategoryBoxService]
})
export class EcologyObjectComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    public navbarService: NavbarService,
    private categoryService: CategoryService,
    public categoryItemService: CategoryitemService,
    public categoryBoxService: CategoryBoxService<Swotitem>,
    private firestoreReferenceService: FirestoreReferencesService

  ) { 
    this.categoryBoxService.type = new Swotitem(0);
    navbarService.onProjectActivityPage = true;
    this.ecologyObjectCategory$ = this.categoryService.getCategory(ids.ecologyObject);
    this.ecologyObjectCategory$.subscribe(category => {
      this.categoryBoxService.categoryReference = this.firestoreReferenceService.getEcologyObjectCollection();
      this.categoryBoxService.getItems();
    })
  }
  ecologyObjectCategory$: Observable<Category>;

  ecologyObjects$: Observable<CategoryItem[]>;
  ngOnInit(): void {}

  description = "Generate potential ecology objects"; 

  ecologyIdeaTooltip = "An ecology idea is something in the challenge domain that a solution might interface with. Define as many ecology ideas as you want and try to be creative, but don't get stuck.";
  strengthTooltip = "The strength of the idea is a value of between 0 and 5, that defines how much value this object could bring to the solution";
  weaknessTooltip = "The weakness of the idea is a value of between 0 and 5, that defines how much the drawbacks of this idea could affect the solution";
  threatTooltip = "The threat of the idea is a value of between 0 and 5, that defines how exposed the object is to threats and how much these will affect the solution";;
  oppotunityTooltip = "The oppotunity of the idea is a value of between 0 and 5, that defines how much value future oppotunities might bring to the solution";;
  totalTooltip = "The total is calculated from the values you entered in the other columns, and suggests how appropriate the object might be. This value can be used to guide which ecology objects you select, but should only be used as a suggestion.";
  selectTooltip = "Click this button to select and unselect ecology objects. When the button is green, the object is selected, while a red button suggests that the object is not selected.";

  nextActivity() {
    // Go to next activity in project
    this.projectService.updateProjectStage(routes.leveragePointActivity);
  }
}
