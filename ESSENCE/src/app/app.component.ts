import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

export interface CategoryView {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "ESSENCE";
  constructor(private store: AngularFirestore){
    
  }

}
