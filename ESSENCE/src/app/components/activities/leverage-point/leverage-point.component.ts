import { Component, OnInit } from '@angular/core';
import { ProjectStage } from 'src/app/model/project';
import { CategoryService } from 'src/app/services/category.service';
import * as ids from '../../../assets/vars';
import * as routes from '../../../assets/routes';
import { ProjectService } from 'src/app/services/project.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model';
import { CategoryBoxService } from 'src/app/services/category-box.service';
import { CategoryitemService } from 'src/app/services/categoryitem.service';
import { FirestoreReferencesService } from 'src/app/services/firestore-references.service';
import { PcrtItem } from 'src/app/model/pcrtItem';

@Component({
  selector: 'app-leverage-point',
  templateUrl: './leverage-point.component.html',
  styleUrls: ['./leverage-point.component.scss']
})
export class LeveragePointComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    public navbarService: NavbarService,
    private categoryService: CategoryService,
    public categoryItemService: CategoryitemService,
    public categoryBoxService: CategoryBoxService<PcrtItem>,
    private firestoreReferenceService: FirestoreReferencesService

  ) { 
    this.categoryBoxService.type = new PcrtItem(0);
    navbarService.onProjectActivityPage = true;
    this.ecologyObjectCategory$ = this.categoryService.getCategory(ids.ecologyObject);
    this.categoryBoxService.categoryReference = this.firestoreReferenceService.getLeveragePointCollection();
    this.categoryBoxService.getItems();
  }
  ecologyObjectCategory$: Observable<Category>;

  ngOnInit(): void {}

  description = "Generate potential ecology objects"; 

  nextActivity() {
    // Go to next activity in project
    this.projectService.updateProjectStage(routes.initialProblemActivity);
  }
}
