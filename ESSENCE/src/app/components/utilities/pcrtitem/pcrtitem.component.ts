import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PcrtItem } from 'src/app/model/pcrtItem';

@Component({
  selector: 'app-pcrtitem',
  templateUrl: './pcrtitem.component.html',
  styleUrls: ['./pcrtitem.component.scss']
})
export class PcrtitemComponent implements OnInit {


  @Input() leverageItem: PcrtItem;
  
  @Output() valueChangedEvent = new EventEmitter<PcrtItem>();

  text = "";

  constructor() { }

  toogleSelect()
  {
    this.leverageItem.toogleStatus();
    this.valueChangedEvent.next(this.leverageItem);
  }
  ngOnInit(): void {
    this.leverageItem;
  }
  updateItemText(val: any) {
    this.leverageItem.text = val.target.value;
    this.valueChangedEvent.next(this.leverageItem);
  }
  updatePower(val: any){
    this.leverageItem.power = val.target.value;
    this.valueChangedEvent.next(this.leverageItem);
  }
  updateCost(val: any) {
    this.leverageItem.cost = val.target.value;
    this.valueChangedEvent.next(this.leverageItem);
  }
  updateRisk(val:any){
    this.leverageItem.risk = val.target.value;
    this.valueChangedEvent.next(this.leverageItem);
  }
  updateTime(val:any){
    this.leverageItem.time = val.target.value;
    this.valueChangedEvent.next(this.leverageItem);
  }

}
