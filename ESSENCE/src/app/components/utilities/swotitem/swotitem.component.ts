import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CategoryItem } from 'src/app/model';
import { Swotitem } from 'src/app/model/swotItem';

@Component({
  selector: 'app-swotitem',
  templateUrl: './swotitem.component.html',
  styleUrls: ['./swotitem.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwotitemComponent),
      multi: true
    }
  ]
})
export class SwotitemComponent implements ControlValueAccessor, OnInit {


  @Input() ecologyItem: Swotitem;
  
  @Output() valueChangedEvent = new EventEmitter<Swotitem>();

  text = "";

  constructor() { }
  writeValue(obj: any): void {
    this.text = obj;
  }
  onChanged: any = () => {};
  onTouched: any = () => {};
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toogleSelect()
  {
    this.ecologyItem.toogleStatus();
    this.valueChangedEvent.next(this.ecologyItem);
  }
  ngOnInit(): void {
    this.ecologyItem;
  }
  updateItemText(val: any) {
    this.ecologyItem.text = val.target.value;
    this.valueChangedEvent.next(this.ecologyItem);
  }
  updateStrength(val: any){
    this.ecologyItem.strength = val.target.value;
    this.valueChangedEvent.next(this.ecologyItem);
  }
  updateWeaknesses(val: any) {
    this.ecologyItem.weaknesses = val.target.value;
    this.valueChangedEvent.next(this.ecologyItem);
  }
  updateThreats(val:any){
    this.ecologyItem.threats = val.target.value;
    this.valueChangedEvent.next(this.ecologyItem);
  }
  updateOppotunities(val:any){
    this.ecologyItem.oppotunities = val.target.value;
    this.valueChangedEvent.next(this.ecologyItem);
  }


}
