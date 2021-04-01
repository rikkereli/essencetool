import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { Categories } from '../assets/categories';
import { ItemConnection } from '../model/itemConnection';
import { CategoryService } from '../services/category.service';
import { CategoryitemService } from '../services/categoryitem.service';

@Directive({
  selector: '[appCategoryItem]'
})
export class CategoryItemDirective implements OnInit {
  @Input() appCategoryItem: {itemId: string, parentCategory: string};

  lastFocusItem:{itemId: string, parentCategory: string};
  itemConnections: string[] = [];
  categories: Categories = new Categories();
  constructor(
    private el: ElementRef,
    private categoryItemService: CategoryitemService) { 
      // Update connected items list
  }
  list;
  ngOnInit(): void {
    this.categoryItemService.getConnectedItems(this.appCategoryItem.itemId, this.appCategoryItem.parentCategory).valueChanges().subscribe(
      (a) => {
        var tempItems = [];
        console.log("Save all connections");
        a.forEach(item => tempItems.push(item.itemId));
        this.itemConnections = tempItems;
        //if(this.isConnectedTo(this.lastFocusItem.itemId)) {
          //this.opacity = 1;
        //}
        //else {
        //  this.opacity = 0.5;
        //}
      }
    );


    this.categoryItemService.inFocusObject.subscribe(
      (currentFocus) => {

        if(currentFocus.itemId !== "") {

        // If another item is in focus, make connection possible
        if(currentFocus.itemId !== this.appCategoryItem.itemId) {
          var categoriesConnected =this.categories.areConnected(currentFocus.parentCategory, this.appCategoryItem.parentCategory);
          // Connection between items should only be possible in connected categories
          if(categoriesConnected){
            this.opacity = 0.7;
            
            // If items are already connected
            if(this.isConnectedTo(currentFocus.itemId)) {
              this.opacity = 1; 
            }
            else {

            }
          }
          
          // If the items are not already connected, make connection possible


          // If the items are already connected, make remove connection possible 
        }
      }
    // If no item is in focus, remove effects
    else {
      this.opacity = 1;

    }
  }
    );
  }


  isConnectedTo(id) {
    return this.itemConnections.includes(id);
  }
  @HostBinding('style.opacity')
  opacity = 1;
  @HostBinding('style.background-color')
  backgroundcolor = "white";
  
  currentFocus: boolean;
  @HostListener('focus') onFocus() {
    this.currentFocus = true;
    this.categoryItemService.inFocusObject.next(this.appCategoryItem);
  }

  @HostListener('blur') onBlur() {
    console.log("Clicked outside of  " + this.appCategoryItem.itemId);
    this.categoryItemService.inFocusObject.next({itemId:"", parentCategory: ""});

  }

}
