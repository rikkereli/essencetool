import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { ResizeService } from '../services/resize.service';
@Directive({
  selector: '[appAutoGrow]',
  host: { '(document:storage)': 'onStorageChange($event)'}
})
export class AutoGrowDirective {

  constructor(
    private el: ElementRef,
    private resizeService: ResizeService) {
    this.resizeService.mouseoverObject.subscribe(
      value => {
        console.log("Currenthover on" + this.appAutoGrow + " is " + value.currentHover);
        if(value.currentHover !== "") {
        if(this.appAutoGrow !== value.currentHover) {
          //this.height="70%";
          //this.width ="70%";
        }
        else {
          this.height="120%";
          this.width="120%";
        }
        }
        else {
          this.height = "inherit";
          this.width = "inherit";
        }

      }
    )
  }

  classname: string;
  onStorageChange(ev:KeyboardEvent) {

  }

  @Input() appAutoGrow;
  
  autoGrow(parent: HTMLElement, classname: string) {
    if (!parent) return;

    // Find all child elements with selected class
    const children = parent.getElementsByClassName(classname);
    let elements = this.el.nativeElement.querySelectorAll(".categoryContainer");

    if(!children) return;
  }
  ngAfterViewChecked(){
    this.autoGrow(this.el.nativeElement, this.appAutoGrow);
  }
  //@HostBinding('style.height')
  height = "inherit";

  //@HostBinding('style.width')
  width = "inherit";

  @HostBinding('style.flex')
  flex = 2;

  @HostBinding('style.flex-grow')
  flexgrow = 3;


  @HostListener('mouseover') onMouseOver() {
    this.resizeService.mouseoverObject.next({currentHover: this.appAutoGrow});
    this.flex = 1;
    this.flexgrow = 5;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.resizeService.mouseoverObject.next({currentHover:""});
    this.flex = 2;
    this.flexgrow = 3;
  }
}
