import { Component } from '@angular/core';
import { CategoryBoxComponent } from './category-box/category-box.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ESSENCE';
  leverageTitle: string = "Leverage";
  leverageItems: string[] = ["Phone", "E-mail", "A good new standard help for me to you", "I4", "I5", "I6", "I7", "I8", "I9"];
  productView: string = "product";

  
}
