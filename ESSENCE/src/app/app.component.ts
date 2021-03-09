import { Component } from '@angular/core';
import { CategoryBoxComponent } from './category-box/category-box.component'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {TextFieldModule} from '@angular/cdk/text-field';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ESSENCE';

  // Titles for all different ESSENCE categories, and example items
  // Use this as example untill we get database up and running
  leverageTitle: string = "Leverage";
  leverageItems: string[] = ["Touch screen", "Handoff", "GPS", "Calendar", "Mails", "Messages", "Accelometer", "Pulse", "Wifi", "Bluetooth"];
  challengeTitle: string = "Challenge";
  challengeItems: string[] = ["Improve Quality of Life(QoL) for citizens with affective disorders"];
  problemTitle: string = "Problem";
  problemItems: string[] = ["Acute depression is a common and serious threat to QoL"];
  prospectTitle: string = "Prospect";
  prospectItems: string[] = ["Psyche (TimePlace) - anticipating and alleviating acute depression"];
  warrantTitle: string = "Warrent";
  warrantItems: string[] = ["Early treatment may aleviate acute depression and self destructive behavior"];
  backingTitle: string = "Backing";
  backingItems: string[] = ["Inexpensive, popular platform. Extensible"];
  elementsTitle: string = "Elements";
  elementsItems: string[] = ["Platform tied with personality", "Citizen’s list of important locations","Calendar entries","User having a profile suggesting mood indicators", "Mental health kit(MHK)", "Acute depression period", "Professional and other caretakers"];
  architectureTitle: string = "Architecture"
  architectureItems: string[] = ["Digital diary module","Digital questionnaire module", "Anticipation module", "Context estimation module", "Context-aware alleviation module", "Sleep analysis module", "Physical activity monitor", "Social activity monitor"];
  qualifierTitle: string = "Qualification"
  qualifierItems: string[] = ["Only for light depressions"];
  rebuttalTitle: string = "Rebuttal"
  rebuttalItems: string[] = ["Still many can benifit from it"];
  scenariosTitle: string = "Scenarios";
  scenariosItems: string[] = ["Writing diary", "Answering the  questionnaire", "Experiencing acute depression", "Sleep", "Physical activity", "Social activity"];
  featuresTitle: string = "Features";
  featuresItems: string[] = ["Digital diary", "Questionnaire", "Trend analysis", "Status analysis", "Alleviation measures agree with context", "Measures selected opportunistically", "Sleep analysis", "Analysis of physical activity", "Analysis of social activity"];
  valuePropositionsTitle: string = "ValuePropositions";
  valuePropositionsItems: string[] = ["Anticipation supplemented with contextual data", "Contextual data used to optimize alleviation measure"];

  productView: string = "product";
  paradigmView: string = "paradigm";
  processView: string = "process";
  projectView: string = "project";
  
}
