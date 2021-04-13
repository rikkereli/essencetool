import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectStage } from 'src/app/model/project';
import { CategoryService } from 'src/app/services/category.service';
import * as ids from '../../../assets/vars';
import * as routes from '../../../assets/routes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/services/project.service';
import { Category } from 'src/app/model';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-challenge-definition',
  templateUrl: './challenge-definition.component.html',
  styleUrls: ['./challenge-definition.component.scss']
})
export class ChallengeDefinitionComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    public categoryService: CategoryService,
    private formBuilder: FormBuilder,
    public navbarService: NavbarService
  ) { 
    this.formGroup = this.formBuilder.group({challenge: this.formBuilder.control('', [Validators.required, Validators.minLength(30)])});
    navbarService.onProjectActivityPage = true;
  }

  i = 0;
  description = ["Most development projects are based on a challenge they are trying to solve","The challenge is the motivation behind the project. The purpose of the project is then to develop something that can metigate the challenge.", "Your first task is to define the challenge for the project"];
  questions = ["What is the purpose of the project?", "Why do you want the project to contribute with?"];
  challengeInfo$: Observable<Category>;
  challengeText: string;
  id: string;
  challengeDescription = "Describe the overall challenge that the project is aiming to solve";
  minLengthErrorMessage = "The challenge should be described with at least 30 characters" ;
  requiredErrorMessage = "You must describe the project challenge before continuing" ;

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
  
  formGroup: FormGroup;
  paradigm = ids.paradigm;
  get challenge() {return this.formGroup.get('challenge');}
}
