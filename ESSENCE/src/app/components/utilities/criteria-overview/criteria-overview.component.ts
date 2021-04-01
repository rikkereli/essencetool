import { Component, Input, OnInit } from '@angular/core';
import { ChosenFeature } from 'src/app/model/chosenFeature';
import { CategoryitemService } from 'src/app/services/categoryitem.service';

@Component({
  selector: 'app-criteria-overview',
  templateUrl: './criteria-overview.component.html',
  styleUrls: ['./criteria-overview.component.scss']
})
export class CriteriaOverviewComponent implements OnInit {

  @Input() parentFeature: ChosenFeature;

  criteria: string[];

  constructor(public categoryItemService: CategoryitemService) { 

  }

  ngOnInit(): void {
  }

}
