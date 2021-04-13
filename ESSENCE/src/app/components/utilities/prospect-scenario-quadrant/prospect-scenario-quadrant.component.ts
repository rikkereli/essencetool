import { Component, Input, OnInit } from '@angular/core';
import { ProspectScenarioService } from 'src/app/services/prospect-scenario.service';

@Component({
  selector: 'app-prospect-scenario-quadrant',
  templateUrl: './prospect-scenario-quadrant.component.html',
  styleUrls: ['./prospect-scenario-quadrant.component.scss']
})
export class ProspectScenarioQuadrantComponent implements OnInit {

  @Input() quadrantName: string;
  constructor(private prospectScenarioService: ProspectScenarioService) { }

  prototype = "";
  metaphor = "";
  proposition = "";
  icon = "";
  selected: "selected" | "notSelected" = "notSelected";

  ngOnInit(): void {
    this.prospectScenarioService.getQuadrant(this.quadrantName).valueChanges().subscribe(quadrant => {
      if(quadrant) {
        if(quadrant.proposition) {
          this.proposition = quadrant.proposition;
        }
        if(quadrant.metaphor) {
          this.metaphor = quadrant.metaphor;
        }
        if(quadrant.icon){
          this.icon = quadrant.icon
        }
        if(quadrant.prototype){
          this.prototype = quadrant.prototype
        }
        if(quadrant.selected){
          this.selected = quadrant.selected
        }
      }
      else {
        this.prospectScenarioService.makeQuadrant(this.quadrantName);
      }
    });
  }


  updateProposition() {
    this.prospectScenarioService.updateQuadrantInformation({proposition: this.proposition}, this.quadrantName);
  }
  updateMetaphor() {
    this.prospectScenarioService.updateQuadrantInformation({metaphor: this.metaphor}, this.quadrantName);
  }
  updatePrototype() {
    this.prospectScenarioService.updateQuadrantInformation({prototype: this.prototype}, this.quadrantName);
  }
  updateIcon(){
    this.prospectScenarioService.updateQuadrantInformation({icon: this.icon}, this.quadrantName);
  }
  toogleSelected(event) {
    var element = "";
    if(event.target.attributes.class) {
       element = <string>event.target.attributes.class.nodeValue;
    }
    if(!element.includes("input")) {
      if(this.selected === "notSelected") {
        this.selected = "selected";
      }
      else {
        this.selected = "notSelected"
      }
      this.prospectScenarioService.updateQuadrantInformation({selected: this.selected}, this.quadrantName);
    }
  }
}
