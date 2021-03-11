import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as ids from '../assets/vars';


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
  @Input() id: String = "";  
  

  onChanged: any = () => {};
  onTouched: any = () => {};

  constructor(private fb: FormBuilder) { }
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
  formGroup;
  createFormGroup() {
    this.formGroup = this.fb.group({
      text: ['']
    })
  }
}
