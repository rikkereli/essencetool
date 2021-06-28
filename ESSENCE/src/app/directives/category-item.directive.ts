import { Directive, ElementRef, Host, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { Categories, CategoryOptions } from '../assets/categories';
import { ItemConnection } from '../model/itemConnection';
import { CategoryService } from '../services/category.service';
import { CategoryitemService } from '../services/categoryitem.service';

@Directive({
  selector: '[appCategoryItem]'
})
export class CategoryItemDirective implements OnInit {
  @Input() appCategoryItem: {itemId: string, parentCategory: CategoryOptions};

  lastFocusItem:{itemId: string, parentCategory: string};
  itemConnections: string[] = [];
  categories: Categories = new Categories();
  constructor(
    private el: ElementRef,
    private categoryItemService: CategoryitemService) { 
      // Update connected items list
  }
  list;
  categoriesHelp: Categories = new Categories();

  ngOnInit(): void {

    this.categoryItemService.inFocusObject.subscribe(
      (currentFocus) => {

        if(currentFocus.itemId !== "none") {

          if(currentFocus.itemId === this.appCategoryItem.itemId){
            this.opacity = 1;
          }
          else {
            this.opacity = 0.7;
          }
        }
        else {
          this.opacity = 1;
        }
      }
    );

    this.categoryItemService.getConnectedItems(this.appCategoryItem.itemId, this.appCategoryItem.parentCategory).valueChanges().subscribe(
      (connections) => {
        var tempItems = [];
        connections.forEach(
          connection => tempItems.push({itemId: connection.itemId, parentCategory: connection.parentCategory}));
        
          var missingConnections = this.categoriesHelp.missingConnections(this.appCategoryItem.parentCategory, tempItems)
        if(missingConnections.length == 0) {
          this.fontStyle = "normal"
          this.title = "All connections in order"
          this.fontWeight = "500"
        } 
        else {
          this.fontStyle = "italic"
          this.fontWeight = "300"
          var missingConnectionsString = "Missing connections to items in "

          for(var i = 0; i < missingConnections.length; i++) {
              if(i === missingConnections.length - 1) {
                missingConnectionsString += missingConnections[i]
              }
              else if(i === missingConnections.length - 2) {
                missingConnectionsString += missingConnections[i] + " and "
              }
              else {
                missingConnectionsString += missingConnections[i] + ", "
              }          
          }
          this.title = missingConnectionsString 
        }
      }
    );
  }

  @HostBinding('style.opacity')
  opacity = 1;

  
  @HostBinding('style.font-style')
  fontStyle = "normal";

  @HostBinding('style.font-weight')
  fontWeight = "normal";

  @HostBinding('title') 
  title = "All connecitons added"
  currentFocus: boolean;
  @HostListener('focus') onFocus() {
    this.currentFocus = true;
    this.categoryItemService.inFocusObject.next(this.appCategoryItem);
    this.categoryItemService.connectObject.next({itemId:"none", parentCategory: "none"})
  }

  @HostListener('blur') onBlur() {
    console.log("Clicked outside of  " + this.appCategoryItem.itemId);
    this.categoryItemService.inFocusObject.next({itemId:"none", parentCategory: "none"});

  }

}
