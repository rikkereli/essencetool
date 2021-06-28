import { Component, Input, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Category, CategoryItem, Item } from '../../../model';
import { ChosenFeature } from 'src/app/model/chosenFeature';
import { CategoryBoxService } from 'src/app/services/category-box.service';
import { FirestoreReferencesService } from 'src/app/services/firestore-references.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { Categories, CategoryOptions } from 'src/app/assets/categories';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryUpdateService } from 'src/app/services/category-update.service';
import { MatDialog, MatDialogClose, MatDialogConfig } from '@angular/material/dialog';
import { PcrtToolComponent } from '../../tools/pcrt-tool/pcrt-tool.component';
import { CompareToolComponent } from '../../tools/compare-tool/compare-tool.component';



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
  @Input() criteria: Boolean = false;
  @Input() category: CategoryOptions;
  

  categoriesHelp: Categories = new Categories();
  view = "";
  title = "";
  tooltip = "";
  help = "";
  parent;
  image ="";
  singleItemCategory = false;
  singleItemCategoryClass = "";
  categoryView$: Observable<InformationField>;

  sameViewAsSelected = false;
  shouldDisplayContent: boolean = false;
  isSelectedCategory: boolean = false;
  
  // FormBuilder is not necessary, but adds syntactic sugar
  constructor(
    public categoryBoxService: CategoryBoxService<CategoryItem>,
    public firestoreReferenceService: FirestoreReferencesService,
    public navbarService: NavbarService,
    private modalService: NgbModal,
    public matDialog: MatDialog,
    public categoryUpdateService: CategoryUpdateService
    ) {
      categoryBoxService.instanceOfGernericType = new CategoryItem(0);
    }
  ngOnInit(): void {
    this.tooltip = this.categoriesHelp.getHelp(this.category);
    this.title = this.categoriesHelp.getDisplayTitle(this.category);
    this.help = this.categoriesHelp.getHelp(this.category);
    this.categoryBoxService.categoryReference = this.firestoreReferenceService.getCategory(this.category);
    this.parent = this.category;
    this.title = this.categoriesHelp.getDisplayTitle(this.category);
    this.view = this.categoriesHelp.getView(this.category);
    this.tooltip = this.categoriesHelp.getTooltip(this.category);
    this.image = this.categoriesHelp.getImage(this.category);

    this.singleItemCategory = this.categoriesHelp.isSingleItemCategory(this.category);
    if(this.singleItemCategory) {
      this.categoryBoxService.categoryOnlyHasOneItem();
      this.singleItemCategoryClass = "singleItemCategory"
    }
  
    this.categoryBoxService.getItemsFromFirestore();

    this.categoryUpdateService.editedConnectedCategories.subscribe(connectedCategories => {
        if(connectedCategories.includes(this.category)){
          this.shouldDisplayContent = true
        }
        else {
          this.shouldDisplayContent = false
        }
      })
      this.categoryUpdateService.currentlyEditCategory.subscribe(currentCategory => {
        if(currentCategory === this.category)
        {
          this.isSelectedCategory = true;
        }
        else {
          this.isSelectedCategory = false;
        }
        this.sameViewAsSelected = this.categoriesHelp.getView(this.category) === this.categoriesHelp.getView(currentCategory);
      })
  }
  displayHelp(content) {
    this.modalService.open(content, {ariaLabelledBy:"modal-basic-title"}).result.then((res)=>{});
  }
  displayCompare(compare) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "700px";
    dialogConfig.width = "1000px";
    dialogConfig.data = {
      category: this.category
    }
    const modalDialog = this.matDialog.open(CompareToolComponent, dialogConfig);
  }
  get isSelectedCategoryClass(): string {
    if(this.isSelectedCategory) {
      return "selectedCategory"
    }
    else {
      return "notSelectedCategory"
    }
  }


  showContent() {
    this.shouldDisplayContent = true;
  }
  hideContent() {
    this.shouldDisplayContent = false;
  }

  get isSelectedViewClass(): string {
    if(this.sameViewAsSelected) {
      return "sameViewAsSelected"
    }
    else {
      return "differentViewThanSelected"
    }
  }
  get displayChangeClass(): string {
    if(this.shouldDisplayContent) {
      return "displayChange"
    }
    else {
      return "doNotDisplayChange"
    }
  }  
  get displayContentClass(): string {
    if(this.shouldDisplayContent) {
      return "displayChange"
    }
    else {
      return "doNotDisplayChange"
    }
  }
  get shouldBeUpdatedClass(): string {
    if(this.categoryUpdateService.shouldUpdateCategory(this.category)){
      return "shouldUpdate"
    }
    else {
      return "shouldNotUpdate"
    }
  }
  editCategory() {
    this.categoryUpdateService.currentlyEditCategory.next(this.category);
  }
  getIdObject(itemId: string) {
    return {itemId: itemId, parentCategory: this.category};
  }

  reasoningDone = false;
  reasonDone() {
    this.reasoningDone = true;
  }
  get isInitialKnowledge() {
    return this.navbarService.currentPage.value === "initialKnowledge"
  }
}
