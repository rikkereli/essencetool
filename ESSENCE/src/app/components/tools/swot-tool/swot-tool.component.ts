import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryOptions } from 'src/app/assets/categories';
import { Category, CategoryItem } from 'src/app/model';
import { Swotitem } from 'src/app/model/swotItem';
import { CategoryBoxService } from 'src/app/services/category-box.service';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryitemService } from 'src/app/services/categoryitem.service';
import { FirestoreReferencesService } from 'src/app/services/firestore-references.service';
import { NavbarService } from 'src/app/services/navbar.service';
import * as ids from '../../../assets/vars';

@Component({
  selector: 'app-swot-tool',
  templateUrl: './swot-tool.component.html',
  styleUrls: ['./swot-tool.component.scss'],
  providers: [CategoryBoxService]
})
export class SwotToolComponent implements OnInit {

  @Input() category: CategoryOptions;

  constructor(
    public navbarService: NavbarService,
    private categoryService: CategoryService,
    public categoryItemService: CategoryitemService,
    public categoryBoxService: CategoryBoxService<Swotitem>,
    private firestoreReferenceService: FirestoreReferencesService

  ) { }
  ecologyObjectCategory$: Observable<Category>;

  ecologyObjects$: Observable<CategoryItem[]>;
  ngOnInit(): void {
    this.categoryBoxService.instanceOfGernericType = new Swotitem(0);
    this.categoryBoxService.categoryReference = this.firestoreReferenceService.getSwotItemCollection(this.category);
    this.categoryBoxService.getItemsFromFirestore(); 

  }

  description = "Generate potential ecology objects"; 

  ecologyIdeaTooltip = "An ecology idea is something in the challenge domain that a solution might interface with. Define as many ecology ideas as you want and try to be creative, but don't get stuck.";
  strengthTooltip = "The strength of the idea is a value of between 0 and 5, that defines how much value this object could bring to the solution";
  weaknessTooltip = "The weakness of the idea is a value of between 0 and 5, that defines how much the drawbacks of this idea could affect the solution";
  threatTooltip = "The threat of the idea is a value of between 0 and 5, that defines how exposed the object is to threats and how much these will affect the solution";;
  oppotunityTooltip = "The oppotunity of the idea is a value of between 0 and 5, that defines how much value future oppotunities might bring to the solution";;
  totalTooltip = "The total is calculated from the values you entered in the other columns, and suggests how appropriate the object might be. This value can be used to guide which ecology objects you select, but should only be used as a suggestion.";
  selectTooltip = "Click this button to select and unselect ecology objects. When the button is green, the object is selected, while a red button suggests that the object is not selected.";


}
