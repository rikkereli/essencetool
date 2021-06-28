import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CategoryOptions } from '../assets/categories';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  mouseoverObject: BehaviorSubject<{currentHover:CategoryOptions}>;


  constructor() { 
    this.mouseoverObject = <BehaviorSubject<{currentHover:CategoryOptions}>> new BehaviorSubject({currentHover: 'none'});

  }

  
}
