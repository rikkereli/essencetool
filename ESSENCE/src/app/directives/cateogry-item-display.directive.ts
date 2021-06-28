import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { Categories, CategoryOptions } from '../assets/categories';
import { ItemConnection } from '../model/itemConnection';
import { CategoryitemService } from '../services/categoryitem.service';

@Directive({
  selector: '[appCateogryItemDisplay]'
})
export class CateogryItemDisplayDirective {

  @Input() appCateogryItemDisplay: {itemId: string, parentCategory: CategoryOptions};

  lastFocusItem:{itemId: string, parentCategory: string};
  
  itemConnections: ItemConnection[] = [];
  categories: Categories = new Categories();

  currentConnect: {itemId: string, parentCategory: CategoryOptions};
  categoriesHelp: Categories = new Categories();
  constructor(
    private el: ElementRef,
    private categoryItemService: CategoryitemService) { 
      // Update connected items list
  }
  list;
  
  ngOnInit(): void {
    this.categoryItemService.getConnectedItems(this.appCateogryItemDisplay.itemId, this.appCateogryItemDisplay.parentCategory).valueChanges().subscribe(
      (connections) => {
        var tempItems = [];
        console.log("Save all connections");
        connections.forEach(
          connection => tempItems.push({itemId: connection.itemId, parentCategory: connection.parentCategory}));
        this.itemConnections = tempItems;
        var missingConnections = this.categoriesHelp.missingConnections(this.appCateogryItemDisplay.parentCategory, this.itemConnections)
        if(missingConnections.length === 0) {
          this.fontStyle = "normal"
          this.fontWeight = "500"
          this.title = "All connections in order"

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

    this.categoryItemService.connectObject.subscribe(
      currentConnect => {
        this.currentConnect = currentConnect
      }
    )

    this.categoryItemService.inFocusObject.subscribe(
      (currentFocus) => {

        if(currentFocus.itemId === "none") {
          this.color = "white"
        }
        else {
          var connectedToFocusItem = this.itemConnections.find(connection => connection.itemId == currentFocus.itemId)

          if(connectedToFocusItem) {
            this.color = "white"
          }
          else {
            this.color = "grey"
          }
        }
      }
    );
  }


  isConnectedTo(id) {
    return this.itemConnections.includes(id);
  }
  @HostBinding('style.color')
  color = "white";

  @HostBinding('title') 
  title = "All connecitons added"

  @HostBinding('style.font-style')
  fontStyle = "normal";

  @HostBinding('style.font-weight')
  fontWeight = "normal";


  @HostListener('click') onClick() { 
    if(this.categoriesHelp.canConnectItems(this.currentConnect.parentCategory, this.appCateogryItemDisplay.parentCategory)){
      if(this.itemConnections.includes(this.itemConnections.find(connection => connection.itemId == this.currentConnect.itemId))){
        this.categoryItemService.removeConnectionsBetweenItems( this.currentConnect.itemId, this.currentConnect.parentCategory, this.appCateogryItemDisplay.itemId, this.appCateogryItemDisplay.parentCategory)
        this.color = "grey"
      }
      else {
        this.categoryItemService.addConntectionBetweenItems( this.currentConnect.itemId, this.currentConnect.parentCategory, this.appCateogryItemDisplay.itemId, this.appCateogryItemDisplay.parentCategory)
        this.color = "white"
      }
    }
  }
  
}
