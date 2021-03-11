import { Injectable } from '@angular/core';
import * as Model from '../model';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryitemService {
  constructor(firestore: AngularFirestore) { 
  }
}
