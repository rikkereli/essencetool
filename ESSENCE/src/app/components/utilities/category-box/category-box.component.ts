import { Component, Input, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Category, CategoryItem, Item } from '../../../model';
import { ChosenFeature } from 'src/app/model/chosenFeature';
import { CategoryBoxService } from 'src/app/services/category-box.service';
import { FirestoreReferencesService } from 'src/app/services/firestore-references.service';
import { NavbarService } from 'src/app/services/navbar.service';



export interface InformationField {
  displayTitle: string;
  view: string;
}

@Component({
  selector: 'app-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.scss'], 
  providers: [CategoryBoxService]
})
export class CategoryBoxComponent implements OnInit {
  // Enter if this is a category with only a single category item. 
  // Is relevant as it might be confusing to have the option of adding several items when only one is appropriate 
  @Input() singleItemCategory: Boolean = false;
  @Input() criteria: Boolean = false;
  @Input() parentFeature: ChosenFeature;
  @Input() category: Category;
  

  view = "";
  title = "";
  tooltip = "";
  parent;
  categoryView$: Observable<InformationField>;

  // FormBuilder is not necessary, but adds syntactic sugar
  constructor(
    public categoryBoxService: CategoryBoxService<CategoryItem>,
    public firestoreReferenceService: FirestoreReferencesService,
    public navbarService: NavbarService
    ) {
      categoryBoxService.type = new CategoryItem(0);
    }

  private sub:any;
  ngOnInit(): void {
    if(this.criteria) {
      this.categoryBoxService.categoryReference = this.firestoreReferenceService.getCriteria(this.parentFeature.id);
      this.parent = this.parentFeature.id;
      this.view = "process";
      this.title = this.parentFeature.text; 
    }
    else {
      this.categoryBoxService.categoryReference = this.firestoreReferenceService.getCategory(this.category.id);
      this.parent = this.category.id;
      this.title = this.category.displayTitle;
      this.view = this.category.view;
      this.tooltip = this.category.tooltip;
    }
    if(this.singleItemCategory) {
      this.categoryBoxService.setSingleitemCategory();
    }
    
    this.categoryBoxService.getItems();
  }
}
