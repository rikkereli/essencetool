import { AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {FormArray, FormGroup, FormBuilder} from '@angular/forms';
import { Observable } from 'rxjs';
import {AngularFirestore, DocumentChangeAction, DocumentData } from '@angular/fire/firestore';
import { CategoryService } from '../../../services/category.service';
import { Category, CategoryItem, Status } from '../../../model';
import { ActivatedRoute } from '@angular/router';
import { Categories } from '../../../assets/categories';
import { CategoryitemService } from 'src/app/services/categoryitem.service';
import { ChosenFeature } from 'src/app/model/chosenFeature';
import { CategoryBoxService } from 'src/app/services/category-box.service';
import { Item } from 'src/app/model/item';



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
  
  categoryFormGroup: FormGroup;
  itemsFormGroup: FormGroup;

  parent;
  categoryView$: Observable<InformationField>;
  title$: Observable<any[]> = new Observable;

  categoryIDS: CategoryItem[] = [];
  bottomBoxAdded: Boolean = false;
  // FormBuilder is not necessary, but adds syntactic sugar
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService, 
    private categoryItemService: CategoryitemService,
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    public categoryBoxService: CategoryBoxService
    ) {}

  private sub:any;
  ngOnInit(): void {
    if(this.criteria) {
      this.categoryBoxService.setReference(this.parentFeature);
      this.parent = this.parentFeature.id;
    }
    else {
      this.categoryBoxService.setReference(this.category);
      this.parent = this.category.id;
    }
    this.itemsFormGroup = this.fb.group({});
    this.categoryFormGroup = this.fb.group({categoryItems: this.fb.array([])});
    
    this.categoryBoxService.getItems().subscribe(changes => {this.dataRecievedFromFirestore(changes)})
  }

  dataRecievedFromFirestore(changes: DocumentData[]) {

      // All items that have been touched
      var newList: String[] = []
      // Go through all items in the list and update accordingly
      changes.map(changedItem => {
              
      // Get content of changed item
      var content = ({id: changedItem.payload.doc['id'], ...changedItem.payload.doc.data()});
      this.categoryItems.push(this.fb.control(content.text))
      newList.push(content.id);
      // Act according to the change type
      if(changedItem.type == 'added') {
        // If we do not yet have this item, add it to the local storage
        if(!this.categoryIDS.some(i => i.id == content.id)) {
          this.itemsFormGroup.addControl(content.id, this.fb.control(content.text));
          this.categoryIDS.push(new CategoryItem(content.text,content.id,content.orderNr,false,content.subcategory,content.status) );
        }
        // If we do have this item, update value locally
        else{
          var controllerValue = this.itemsFormGroup.controls[content.id].value;
          this.categoryIDS.find(e => e.id == content.id).updateItemValue(content);
          if(!(controllerValue == content.text)) {
            this.itemsFormGroup.controls[content.id].setValue(content.text);
          }
        }
      }
      if(changedItem.type =='modified') {
        this.itemsFormGroup.controls[content.id].setValue(content.text);
        // Update value of category id item
        this.categoryIDS.find(e => e.id == content.id).updateItemValue(content);
      }
    
    }) 
    // Delete all items not in the newlist, as these must have been removed from storage
    this.categoryIDS.forEach((element, index) => {
      if(!newList.includes(element.id) && !element.localOnly){
        this.categoryIDS.splice(index, 1);
        this.itemsFormGroup.removeControl(element.id);
      }

    });
    // Make sure category ids are in sorted order
    this.categoryIDS.sort((a,b) => a.orderNr - b.orderNr);
    // Add an empty box in the bottom of the list in order to be able to edit
    if(!this.bottomBoxAdded) {
      this.addBottomBox();
      this.bottomBoxAdded = true;
    }
  }

  deleteLocal(id) {
    var index = this.categoryIDS.findIndex(e => e.id == id);
    this.categoryIDS.splice(index, 1);
    this.itemsFormGroup.removeControl(id);
  }
  // Adds an empty box in the end of the screen
  // Does not add it to Firestore
  addBottomBox(){
    // We should never add a bottom box to a single item category
    if(!this.singleItemCategory){
    var newItemId: string = this.firestore.createId();
    // Add local control
    this.itemsFormGroup.addControl(newItemId,this.fb.control(""));
    this.categoryIDS.push(new CategoryItem("",newItemId,this.categoryIDS.length, true, "", Status.active));
    }
  }

  addEmptyBox(val: any) {
    // Find current value and see if it is empty. If user clicks on an empty field, add a new one.
    var currentValue = val.target.value;
    if(currentValue == "") {
      this.addBottomBox();
    }
  }

  // Deletes the item if empty when user loose focus. 
  removeEmptyItems(categoryItem: CategoryItem) {
    // We should only delete items if we can have more than one
    if(!this.singleItemCategory){
      // If item is local, delete in formcontrol and category box
      if(categoryItem.localOnly) {
        this.deleteLocal(categoryItem.id);
      }
      // If from firestore, delete from server
      else {
        this.deleteItem(categoryItem);
      }
    }
  }
  // Delete item from firestore and move all items below
  deleteItem(categoryItem) {
    // Save orderNr from category item 
    var orderNr = categoryItem.orderNr;
    // Delete item from firestore
    this.categoryBoxService.deleteItem(categoryItem);
    // Go through all other items in category, move order nr by one.
    this.categoryIDS.forEach(element => {
      if(element.orderNr > orderNr && !element.localOnly) {
        // Decrease the order number by one
        element.orderNr = element.orderNr-1;
        this.categoryBoxService.updateItemOrderNr(element);
      }
    });
  }

  // Add and delete items functionality
  // If we have an empty item, it should be deleted. 
  // There should always be an empty item in the bottom 
  // When filled out, it is added to the list
  
  updateItemText(item) {
    this.categoryBoxService.updateItemText(item);
  }

  toogleItemStatus(item) {
    this.categoryBoxService.updateItemStatus(item);
  }

  get categoryItems(){
    return this.categoryFormGroup.get("categoryItems") as FormArray;
  }
  addCategoryItem(){
    this.categoryItems.push(this.fb.control(''));
  }
}
