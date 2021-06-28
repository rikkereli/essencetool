import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { Categories } from '../assets/categories';
import { ResizeService } from '../services/resize.service';

@Directive({
  selector: '[appToogleActivity]'
})

export class ToogleActivityDirective {


  @Input() appToogleActivity;
  categories: Categories = new Categories();
  
  constructor(
    private el: ElementRef,
    private resizeService: ResizeService
  ) { 

      this.resizeService.mouseoverObject.subscribe(
      value => {
        console.log(this.appToogleActivity + " notified " + value.currentHover);
        // If mouseover item
        if(value.currentHover !== "none") {
          // If we are not hovering over current item 
          if(this.appToogleActivity !== value.currentHover) {
            // See if category is connected
            let inList = this.categories.areConnected(value.currentHover, this.appToogleActivity);
            // If item is not connected
            if(!inList) {
              this.display = "none";
            }
          }
          // Opacity of current item should always be 1
          else {
            this.display = "block";
          }
        }
        // If mouse not over any item 
        else {
          this.display = "none";
        }
      }
      );
    
  }

  @HostBinding('style.display')
  display = "none";

}
