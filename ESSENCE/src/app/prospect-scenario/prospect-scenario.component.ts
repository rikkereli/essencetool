import { Component, OnInit } from '@angular/core';
import * as ids from './../assets/vars';
import * as Model from '../model';
import { CategoryitemService } from '../services/categoryitem.service';
import { SessionService } from '../services/session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-prospect-scenario',
  templateUrl: './prospect-scenario.component.html',
  styleUrls: ['./prospect-scenario.component.scss']
})
export class ProspectScenarioComponent  implements OnInit {

  constructor(
    categoryItemService: CategoryitemService,
    sessionService: SessionService, 
    router: Router,
    route: ActivatedRoute,
    fb: FormBuilder) {
  }
  ngOnInit() {
  }
  createFormGroup() {

  }
  
}
