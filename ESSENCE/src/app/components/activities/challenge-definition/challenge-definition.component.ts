import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import * as ids from '../../../assets/vars';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/model';
import { NavbarService } from 'src/app/services/navbar.service';


@Component({
  selector: 'app-challenge-definition',
  templateUrl: './challenge-definition.component.html',
  styleUrls: ['./challenge-definition.component.scss']
})
export class ChallengeDefinitionComponent implements OnInit, AfterViewInit {

  constructor(
    private modalService: NgbModal,
    public categoryService: CategoryService,
    private formBuilder: FormBuilder,
    public navbarService: NavbarService,
    private cdref: ChangeDetectorRef
  ) { 
    this.formGroup = this.formBuilder.group({challenge: this.formBuilder.control('', [Validators.required, Validators.minLength(30)])});
    navbarService.onProjectActivityPage = true;
  }

  placement;

  ngAfterViewInit(): void {
    this.challengeTextDiv = document.getElementById("challengeText")
    this.challengeCircleDiv = document.getElementById("challengeCircle");

    var boundingRect = this.challengeTextDiv.getBoundingClientRect();
    var textX =  this.challengeTextDiv.getBoundingClientRect().x;
    var textY = this.challengeTextDiv.getBoundingClientRect().y;
    var circleX = this.challengeCircleDiv.getBoundingClientRect().x;
    var circleY = this.challengeCircleDiv.getBoundingClientRect().y;
    this.placement = {circleX: circleX, circleY: circleY, textX: textX, textY: textY};
    this.cdref.detectChanges();
  }
  personName ="Rikke";

  fillColor = 'rgb(255, 0, 0)';

  changeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }
  i = 0;
  description = ["This oval symbolizes a challenge","In ESSENCE, the challenge is the foundation of a project, the reason that the project is necessary.", "Typically, a project is initiated based on a challenge that someone experiences.","The development project is then an attempt to find a solution that mitigates the challenge.","Before any work should be done in the project, the challenge should be clearly defined."];
  questions = ["What is the purpose of the project?", "Why do you want the project to contribute with?"];
  challengeInfo$: Observable<Category>;
  challengeText: string;
  id: string;
  challengeDescription = "Describe the overall challenge that the project is aiming to solve";
  minLengthErrorMessage = "The challenge should be described with at least 30 characters" ;
  requiredErrorMessage = "You must describe the project challenge before continuing" ;

  challengeCircleDiv;
  challengeTextDiv;
  ngOnInit(): void {
      this.categoryService.getChallenge().subscribe(challenge => 
        {
          this.formGroup.controls['challenge'].setValue(challenge[0].text,);
        });
    this.challengeInfo$ = this.categoryService.getInformation(ids.challenge).valueChanges();
  }

  displayHelp(content) {
    this.modalService.open(content, {ariaLabelledBy:"modal-basic-title"}).result.then((res)=>{});
  }
  
  getStart() {

  }
  formGroup: FormGroup;
  paradigm = ids.paradigm;

  nextInfo() {
    this.i += 1; 
  }
  previousInfo() {
    this.i -=1;
  }
  get challenge() {return this.formGroup.get('challenge');}
  get start() {
    console.log("START");
    return "100";}
}
