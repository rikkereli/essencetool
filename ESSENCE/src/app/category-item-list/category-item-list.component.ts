import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-category-item-list',
  templateUrl: './category-item-list.component.html',
  styleUrls: ['./category-item-list.component.scss']
})
export class CategoryItemListComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  clickFunction(val: any) {
    // Find current value and see if it is empty. If user clicks on an empty field, add a new one.
    var currentValue = val.target.value;
    if(currentValue == "") {
      this.categoryItems.push(this.fb.control(""));
    }
  }
    // Deletes the item if empty when user loose focus. 
    clickOutsideFunction(val:any) {
      // Get the item number to identify it in the list
      var id = val.currentTarget.attributes.getNamedItem("ng-reflect-name").nodeValue;
      // Get field value. If empty, delete instance
      var value = val.target.value;
      if(value == "") {
         this.categoryItems.removeAt(id);
      }
  
    }
    get categoryItems(){
      return this.categoryFormGroup.get("categoryItems") as FormArray;
    }
    categoryFormGroup;
  
}
