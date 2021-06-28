import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { Categories, CategoryOptions } from '../assets/categories';
import { CategoryitemService } from '../services/categoryitem.service';

@Directive({
  selector: '[appCategoryItemButton]'
})
export class CategoryItemButtonDirective implements OnInit {

  @Input() appCategoryItemButton: {itemId: string, parentCategory: CategoryOptions};
  categories: Categories = new Categories();
  itemConnections: string[];
  lastFocusItem:{itemId: string, parentCategory: string};
  constructor(
    private el: ElementRef,
    private categoryItemService: CategoryitemService) { }

  ngOnInit(): void {
    this.categoryItemService.getConnectedItems(this.appCategoryItemButton.itemId, this.appCategoryItemButton.parentCategory).valueChanges().subscribe(
      (a) => {
        var tempItems = [];
        a.forEach(item => tempItems.push(item.itemId));
        this.itemConnections = tempItems;
      }
    );
    if(this.categories.isCategory(this.appCategoryItemButton.parentCategory)) {
    this.categoryItemService.inFocusObject.subscribe(
      (currentFocus) =>
      {

        // In input selected, save the selected id
        if(currentFocus.itemId != "none") {
          this.lastFocusItem = currentFocus;
        
        // If another item is in focus, make connection possible
        if(currentFocus.itemId !== this.appCategoryItemButton.itemId) {

          var categoriesConnected = this.categories.areConnected(currentFocus.parentCategory, this.appCategoryItemButton.parentCategory);
          
          // Connection between items should only be possible in connected categories
          if(categoriesConnected){

            this.display = "block";

            if(this.itemConnections) {
            // If items are already connected
            if(this.isConnectedTo(currentFocus.itemId)) {
              // If it is included, opacity should be 1
              this.backgroundcolor = this.connection;

            }
            else {
              // If it is not yet included, opacity should be 0.5
              this.backgroundcolor =this.noConnection;
            }
          }
        }
      }
          // If the items are not already connected, make connection possible


          // If the items are already connected, make remove connection possible 
        }
    // If no item is in focus, remove effects
    // if mouse is currently over, wait for on mouse leave and reset
      else {
        if(this.mouseOver) {
          console.log("Mouse is still over, so wait for display none");
          this.shouldReset = true;
        }
        else {
          console.log("Mouse is not over, set display none");
          this.display ="none";
          this.opacity = 1;
        }

      }
    });
  }
  }
  // Should reset on mouse leave
  shouldReset = false;


  @HostBinding('style.display')
  display = "none";

  @HostBinding('style.background-color')
  backgroundcolor = "black";

  @HostBinding('style.border-color')
  bordercolor = "white";
  
  @HostBinding('style.opacity')
  opacity = 1;

  @HostListener('click') 
  onClick() {
    console.log("Click")
    // If already connected, remove connection
    if(this.isConnectedTo(this.lastFocusItem.itemId)) {
      this.categoryItemService.removeConnectionsBetweenItems(this.lastFocusItem.itemId, this.lastFocusItem.parentCategory, this.appCategoryItemButton.itemId,this.appCategoryItemButton.parentCategory);
      this.backgroundcolor = this.noConnection;
    }
    // If not, connect
    else{
      this.categoryItemService.addConntectionBetweenItems(this.lastFocusItem.itemId, this.lastFocusItem.parentCategory, this.appCategoryItemButton.itemId,this.appCategoryItemButton.parentCategory);
      this.backgroundcolor = this.connection
    }
  };
  
  noConnection = "grey";
  connection = "white";
  shiftColor() {
    if(this.backgroundcolor === this.connection) {
      this.backgroundcolor = this.noConnection;
    }
    else {
      this.backgroundcolor = this.connection;
    }
  }

  isConnectedTo(item) {
    return this.itemConnections.includes(item);
  }

  mouseOver = false;
  @HostListener('mouseover') onMouseOver() {
    this.mouseOver = true;
    this.bordercolor = "grey";
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave($event) {
    // If this is target, false posisive
    if($event.toElement.value === this.appCategoryItemButton.itemId) {
      console.log("False positive");
    }
    else{
    this.bordercolor= "white";
    this.mouseOver = false;
    if(this.shouldReset) {
      console.log("Should reset");
      this.display ="none";
      this.opacity = 1;
      this.shouldReset = false;
    }
  }
}
}
