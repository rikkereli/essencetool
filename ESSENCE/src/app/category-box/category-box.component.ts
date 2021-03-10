import { AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {TextFieldModule} from '@angular/cdk/text-field';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import {FormArray, FormControl, FormGroup, NgForm, FormBuilder} from '@angular/forms';

export enum Views {
  Paradigm = "paradigm", 
  Process = "process", 
  Product = "product",
  Project = "project"
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
  // Enter if this is a category with only a single category item. 
  // Is relevant as it might be confusing to have the option of adding several items when only one is appropriate 
  @Input() singleItemCategory: Boolean = false;
  itemsForm: FormArray = new FormArray([]);
  categoryFormGroup: FormGroup;
  exp: FormControl;
  // FormBuilder is not necessary, but adds syntactic sugar
  constructor(private fb: FormBuilder) { 
    // TODO I am assigning this twice as I don't want to get an error for not initializing and do not know how to update the array
    this.categoryFormGroup = this.fb.group({
      title: this.fb.control(this.title),
      categoryItems: this.fb.array([])
    });
    this.exp = this.fb.control("Exp");

  }

  name = new FormControl('Rikke');
  view: Views = Views.Process;
  ngOnInit(): void {

      //document.documentElement.style.setProperty('view-color', '#fff');
      this.view = this.boxView as Views;
      
      this.categoryFormGroup = this.fb.group({
        title: this.title,
        categoryItems: this.fb.array(this.items)
      });
      // Add an extra field that users can fill out 
      if(!this.singleItemCategory){
        this.addCategoryItem();
      }
    this.categoryFormGroup.get("categoryItems")?.valueChanges.subscribe(value => {
      console.log(value);
    })   
  }
  clickFunction(val: any) {
    // Find current value and see if it is empty. If user clicks on an empty field, add a new one.
    var currentValue = val.target.value;
    if(currentValue == "") {
      this.categoryItems.push(this.fb.control(""));
    }
  }
  clickOutsideFunction(val:any) {
    // Get the item number to identify it in the list
    var id = val.currentTarget.attributes.getNamedItem("ng-reflect-name").nodeValue;
    // Get field value. If empty, delete instance
    var value = val.target.value;
    if(value == "") {
       this.categoryItems.removeAt(id);
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
}
