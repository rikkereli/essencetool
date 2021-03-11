import { AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {TextFieldModule} from '@angular/cdk/text-field';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {map, take} from 'rxjs/operators';
import {FormArray, FormControl, FormGroup, NgForm, FormBuilder} from '@angular/forms';
import { Observable } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';
import * as ids from '../assets/vars';
import * as Model from '../model';

import { CrudService } from '../shared/crud.service';
import { CategoryitemService } from '../services/categoryitem.service';
import { SessionService } from '../services/session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category, CategoryItem } from '../model';


export enum Views {
  Paradigm = "paradigm", 
  Process = "process", 
  Product = "product",
  Project = "project"
}

export interface InformationField {
  displayTitle: string;
  view: string;
}

@Component({
  selector: 'app-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.scss']
})
export class CategoryBoxComponent implements AfterViewInit, OnInit {
  @Input() title: string = "undefined";
  @Input() boxView: string = "";  
  @Input() items: string[] = [];
  @Input() categoryRef: AngularFirestoreDocument<DocumentData>;
  // Enter if this is a category with only a single category item. 
  // Is relevant as it might be confusing to have the option of adding several items when only one is appropriate 
  @Input() singleItemCategory: Boolean = false;
  itemsForm: FormArray = new FormArray([]);
  categoryFormGroup: FormGroup;
  @Input() category: string = "leverage";
  exp: FormControl;
  
  title$: Observable<any[]> = new Observable;
  categoryItems$;
  // FormBuilder is not necessary, but adds syntactic sugar
  constructor(
    private fb: FormBuilder, 
    private categoryService: CategoryService,
    private firestore: AngularFirestore

    ) { 
    // TODO I am assigning this twice as I don't want to get an error for not initializing and do not know how to update the array
    this.categoryFormGroup = this.fb.group({
      title: this.fb.control(this.title),
      categoryItems: this.fb.array([])
    });
    this.exp = this.fb.control("Exp");
  }

  categoryIDS: CategoryItem[] = [];
  category$: Observable<Category>;
  columnDefs = [
    { headerName: 'Text', field: 'text', sortable: true, filter: true }]
  bottomBoxAdded: Boolean = false;

  categoryView$: Observable<InformationField>;
  name = new FormControl('Rikke');
  view: Views = Views.Process;
  itemsFormGroup: FormGroup;
  ngOnInit(): void {
    this.category$ = this.categoryService.getCategory(this.category);
    this.categoryItems$ = this.categoryService.getCategoryItems(this.category);

    //document.documentElement.style.setProperty('view-color', '#fff');
      this.view = this.boxView as Views;
      
      this.itemsFormGroup = this.fb.group({});
      this.categoryFormGroup = this.fb.group({
        title: this.title,
        categoryItems: this.fb.array([])
        
      });
      // Listen to the items list and update the formscontrol accordingly
      this.categoryService.getCategoryItems(this.category).subscribe(item => {
      })   

      
      this.firestore.collection(ids.categories).doc(this.category).collection<CategoryItem>("items", ref => ref.orderBy("orderNr")).snapshotChanges().subscribe(changes => {
        // All items that have been touched
        var newList: String[] = []
        changes.map(changedItem => {
          
          // Get content of changed item
          var content = ({id: changedItem.payload.doc.id, ...changedItem.payload.doc.data()});
          this.categoryItems.push(this.fb.control(content.text))
          newList.push(content.id);
          // Act according to the change type
          if(changedItem.type == 'added') {
            // If we do not yet have this item, add it
            if(!this.categoryIDS.some(i => i.id == content.id)) {
              this.itemsFormGroup.addControl(content.id, this.fb.control(content.text));
              this.categoryIDS.push(content);
            }
            // If we do have this item, check if content is updated
            else{
              var controllerValue = this.itemsFormGroup.controls[content.id].value;
              if(!(controllerValue == content.text)) {
                this.itemsFormGroup.controls[content.id].setValue(content.text);
              }
            }
            //this.categoryFormGroup.controls[content.id].setValue(content.text);
          }
          if(changedItem.type =='modified') {
             this.itemsFormGroup.controls[content.id].setValue(content.text);
             this.categoryIDS.find(e => e.id == content.id).text = content.text;
             this.categoryIDS.find(e => e.id == content.id).orderNr = content.orderNr;
          }
          else {

          }

        }
        // Delete all items not in the newlist

        ) 
        this.categoryIDS.forEach((element, index) => {
          if(!newList.includes(element.id) && !element.localOnly){
            this.categoryIDS.splice(index, 1);
            this.itemsFormGroup.removeControl(element.id);
          }

        });
        this.categoryIDS.sort((a,b) => a.orderNr - b.orderNr);
        // Add an empty box in the bottom of the list in order to be able to edit
        if(!this.singleItemCategory && !this.bottomBoxAdded) {
          this.addBottomBox();
          this.bottomBoxAdded = true;
        }
      })
      

          // Get ID and nr


    this.categoryFormGroup.get("categoryItems")?.valueChanges.subscribe(value => {
      console.log(value);
    })

    // Subscribe to the items list and update the formsarray accordingly
    

  }
  deleteLocal(id) {
    var index = this.categoryIDS.findIndex(e => e.id == id);
    this.categoryIDS.splice(index, 1);
    this.itemsFormGroup.removeControl(id);
  }
  // Adds an empty box in the end of the screen
  // Does not add it to Firestore
  addBottomBox(){
    var newItemId: string = this.firestore.createId();
    // Add local control
    this.itemsFormGroup.addControl(newItemId,this.fb.control(""));
    this.categoryIDS.push(new CategoryItem("",newItemId,this.categoryIDS.length, true));
  }

  onItemChanged(val: any, categoryItem: CategoryItem) {
    // Get item document ID

    // See if item is stored in categoryIDS list
    // If so, update information here
    var orderNr =  this.categoryIDS.find(e => e.id == categoryItem.id).orderNr;
    // Make sure not local only
    this.categoryIDS.find(e => e.id == categoryItem.id).localOnly = false;
    this.categoryService.updateItem(this.category, categoryItem.id, val.target.value, orderNr);

  }
  clickFunction(val: any) {
    // Find current value and see if it is empty. If user clicks on an empty field, add a new one.
    var currentValue = val.target.value;
    if(currentValue == "") {
      this.addBottomBox();
    }
  }
  // Deletes the item if empty when user loose focus. 
  clickOutsideFunction(val:any, categoryItem: CategoryItem) {
    // We should only delete items if we can have more than one
    if(!this.singleItemCategory){
    // Get item document ID
      // Get the item number to identify it in the list
      //var id = val.currentTarget.attributes.getNamedItem("ng-reflect-name").nodeValue;
      // Get field value. If empty, delete instance
      var value = val.target.value;
      if(value == "") {
        // If local only, delete from local list
        if(this.categoryIDS.find(e => e.id == categoryItem.id).localOnly) {
          this.deleteLocal(categoryItem.id);
        }
        // If from firestore, delete from server
        else {
        this.categoryService.deleteItem(this.category, categoryItem.id);
        var orderNr =  this.categoryIDS.find(e => e.id == categoryItem.id).orderNr;
        this.categoryIDS.forEach(element => {
          if(element.orderNr > orderNr && !element.localOnly) {
            var newOrderNr = element.orderNr-1;
            this.categoryService.updateItem(this.category, element.id, element.text, newOrderNr);
          }
        });}
        //this.categoryItems.removeAt(id);

      }
    }
  }

  ngAfterViewInit() {
    const options: any = {
      watch: true,
      preserveStatic: false,
      variables: {

      }
    }

  }

  // Add and delete items functionality
  // If we have an empty item, it should be deleted. 
  // There should always be an empty item in the bottom 
  // When filled out, it is added to the list
  

  get categoryItems(){
    return this.categoryFormGroup.get("categoryItems") as FormArray;
  }
  addCategoryItem(){
    this.categoryItems.push(this.fb.control(''));
  }

  AddItem(item: String) {

  }
  UpdateItem(item: String) {

  }
}
