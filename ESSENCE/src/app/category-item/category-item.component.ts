import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategoryItemComponent),
      multi: true
    }
  ]
})
export class CategoryItemComponent implements ControlValueAccessor, OnInit {
  @Input() text: String = "";  
  

  onChanged: any = () => {};
  onTouched: any = () => {};

  constructor() { }
  writeValue(obj: any): void {
    this.text = obj;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
  }

}
