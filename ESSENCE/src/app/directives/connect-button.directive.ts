import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { CategoryOptions } from '../assets/categories';
import { CategoryitemService } from '../services/categoryitem.service';

@Directive({
  selector: '[appConnectButton]'
})
export class ConnectButtonDirective {

  @Input() appConnectButton: {itemId: string, parentCategory: CategoryOptions};

  constructor(private categoryItemService: CategoryitemService) {  }
  ngOnInit(): void {
    this.categoryItemService.connectObject.subscribe(
      connectObject => {
       if(connectObject.itemId === this.appConnectButton.itemId){
         this.active = true; 
         this.backgroundColor = "white";
       }
       else {
         this.active = false;
         this.backgroundColor = "grey"
       }
    })
  }


  active = false;
  @HostBinding('style.background-color')
  backgroundColor = "white";
  @HostListener('click') onClick() { 
      if(this.active) {
        this.categoryItemService.connectObject.next({itemId: "none", parentCategory:"none"})
      }
      else {
        this.categoryItemService.connectObject.next(this.appConnectButton)
        this.categoryItemService.inFocusObject.next(this.appConnectButton)
      }

  }
}
