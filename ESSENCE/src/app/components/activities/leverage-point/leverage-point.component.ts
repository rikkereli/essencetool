import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { CategoryBoxService } from 'src/app/services/category-box.service';
import { CategoryitemService } from 'src/app/services/categoryitem.service';
import { FirestoreReferencesService } from 'src/app/services/firestore-references.service';
import { PcrtItem } from 'src/app/model/pcrtItem';

@Component({
  selector: 'app-leverage-point',
  templateUrl: './leverage-point.component.html',
  styleUrls: ['./leverage-point.component.scss'],
  providers: [CategoryBoxService]
})
export class LeveragePointComponent implements OnInit {

  constructor(
    public navbarService: NavbarService,
    public categoryItemService: CategoryitemService,
    public categoryBoxService: CategoryBoxService<PcrtItem>,
    private firestoreReferenceService: FirestoreReferencesService

  ) { 
    this.categoryBoxService.type = new PcrtItem(0);
    this.categoryBoxService.categoryReference = this.firestoreReferenceService.getLeveragePointCollection();
    this.categoryBoxService.getItems();
  }

  ngOnInit(): void {

  }

  description = "Generate potential ecology objects"; 
  leveragePointIdeaTooltip = "A leverage point is a resource that can be implemented into the solution in order to give a strategic advantage, e.g., faster delivery or better quality.";
  powerTooltip = "The power of a leverage point is the magnitude of the strategic advantage that the leverage point offer. This can be between 0 and 10.";
  costTooltip = "The cost of the leverage point is how much money or other resources except man-hours that it will take to intergrate the leverage point. This can be between 0 and 5.";
  riskTooltip = "The risk of a leverage point constitutes the risks to the product if we implement the leverage point. This can be the risk that a library is changed significantly. This can be between 0 and 5";
  timeTooltip = "The time constitutes how many man-hours is will take to implement the leverage point. The time should not be directly translated from man-hours, as the time price should be considered in relation to the power of the leverage point.";
  totalTooltip = "The total is calculated from the values you entered in the other columns, and suggests how appropriate the leverage point might be. This value can be used to guide which leverage points you select, but should only be used as a suggestion.";
  selectTooltip = "Click this button to select and unselect leverage points. When the button is green, the leverage point is selected, while a red button suggests that the object is not selected.";
}
