import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { Categories } from '../assets/categories';
import { ResizeService } from '../services/resize.service';
@Directive({
  selector: '[appAutoGrow]',
  host: { '(document:storage)': 'onStorageChange($event)'}
})
export class AutoGrowDirective {

  @Input() appAutoGrow;
  // The opacity that dimmed items should have
  fadedOpacity = 0.3;

  categories: Categories = new Categories();
  constructor(
    private resizeService: ResizeService) {
      // Initiate connectedCategories
      this.resizeService.mouseoverObject.subscribe(
      value => {
        if(value.currentHover === "") {
          // If mouse is currently not over any item, the category should be solid
          this.opacity = 1;
        }
        else {
          if(this.appAutoGrow === value.currentHover) {
            // The current mouseover item should always be solid
              this.opacity = 1;
          }
          else {
            // See if this category is connected to mouseover category
            let inList = this.categories.areConnected(value.currentHover, this.appAutoGrow);
            if(inList) {
              this.opacity = 1;
            }
            else {
              this.opacity = this.fadedOpacity;
            }
          }
        }
      }
    )
  }

  @HostBinding('style.opacity')
  opacity = 1;


  // If mouse is over category, broadcast this to all categories
  @HostListener('mouseover') onMouseOver() {
    this.resizeService.mouseoverObject.next({currentHover: this.appAutoGrow});
  }
  // If mouse leaves category, broadcast to all categories
  @HostListener('mouseleave') onMouseLeave() {
    this.resizeService.mouseoverObject.next({currentHover:""});
  }
}
