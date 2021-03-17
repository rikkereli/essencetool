import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  mouseoverObject: BehaviorSubject<{currentHover:string}>;


  constructor() { 
    this.mouseoverObject = <BehaviorSubject<{currentHover:string}>> new BehaviorSubject({currentHover: ''});

  }

  
}
