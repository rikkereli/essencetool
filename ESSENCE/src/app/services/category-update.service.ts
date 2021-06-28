import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Categories, CategoryOptions } from '../assets/categories';

export type ViewSelection = "none"|"paradigm"|"product"|"project"|"process";

@Injectable({
  providedIn: 'root'
})
export class CategoryUpdateService {

  constructor() { 
    this.currentlyEditCategory.subscribe(category => {
      // When category is in edit mode, it is being considered. 
      // We therefore retrieve the connected categories and remove it from the list.
      var editedConnectedCategories =  this.shouldUpdate.get(category);
      if (editedConnectedCategories){
        this.editedConnectedCategories.next(editedConnectedCategories);
      }
      else {
        this.editedConnectedCategories.next([]);
      }
  
      this.shouldUpdate.delete(category)
    })
  }
  
  
  // The category that was edited last 
  currentlyEditCategory: BehaviorSubject<CategoryOptions> = new BehaviorSubject("none");
  // The categories that has been edited and are connected to current edit category
  editedConnectedCategories: BehaviorSubject<CategoryOptions[]> = new BehaviorSubject([]);
  // The categories that should be updated based on the changed categories
  shouldUpdate: Map<CategoryOptions, CategoryOptions[]> = new Map([])


  selectedView: ViewSelection = "none"; 
  updateCategory: CategoryOptions = "none";
  categoriesInfo: Categories = new Categories();



  shouldUpdateCategory(category: CategoryOptions){
    if(this.shouldUpdate.has(category)) {
      return true;
    }
    else {
      return false;
    }
  }
  categoryUpdated(category: CategoryOptions) {
    var connected = this.categoriesInfo.shouldConsiderOnUpdateCategories.get(category);
    connected.forEach(connectedCategory => {

      if(this.shouldUpdate.has(connectedCategory)){
        var connected = this.shouldUpdate.get(connectedCategory);
        if(!connected.includes(category)) {
          connected.push(category)
        }
      }
      else{
        this.shouldUpdate.set(connectedCategory, [category])
      }

    })

  }
}
