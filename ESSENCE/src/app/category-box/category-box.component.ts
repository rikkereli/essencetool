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
  experimentForm: FormGroup;
  exp: FormControl;
  // FormBuilder is not necessary, but adds syntactic sugar
  constructor(private fb: FormBuilder) { 
    this.experimentForm = this.fb.group({
      name: new FormControl("Rikke Holm Jessen"), 
      hobbies: this.fb.array(["Painting", "Cooking", "TV"])
    })
    this.categoryFormGroup = this.fb.group({
      title: this.fb.control(this.title),
      categoryItems: this.fb.array(this.items)
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
  }
  ngAfterViewInit() {
    const options: any = {
      watch: true,
      preserveStatic: false,
      variables: {

      }
    }
  }

  get categoryItems(){
    return this.categoryFormGroup.get("categoryItems") as FormArray;
  }
  addCategoryItem(){
    this.categoryItems.push(this.fb.control(''));
  }
}
