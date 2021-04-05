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
  styleUrls: ['./ecology-object.component.scss']
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
      this.categoryBoxService.categoryReference = this.firestoreReferenceService.getEcologyItemCollection();
      this.categoryBoxService.getItems();
    })
  }
  ecologyObjectCategory$: Observable<Category>;

  ecologyObjects$: Observable<CategoryItem[]>;
  ngOnInit(): void {}

  description = "Generate potential ecology objects"; 
  nextActivity() {
    // Go to next activity in project
    this.projectService.updateProjectStage(routes.leveragePointActivity);
  }
}
