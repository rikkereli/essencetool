import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model';
import { ProjectStage } from 'src/app/model/project';
import { CategoryService } from 'src/app/services/category.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProjectService } from 'src/app/services/project.service';
import * as routes from '../../../assets/routes';
import * as ids from '../../../assets/vars';

@Component({
  selector: 'app-initial-problem',
  templateUrl: './initial-problem.component.html',
  styleUrls: ['./initial-problem.component.scss']
})
export class InitialProblemComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private categoryService: CategoryService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    public navbarService: NavbarService
  ) { 
    this.formGroup = this.formBuilder.group(
      {problem: this.formBuilder.control('', [Validators.required, Validators.minLength(30)]),
       warrant: this.formBuilder.control('', [Validators.required, Validators.minLength(30)])})
    navbarService.onProjectActivityPage = true;
  }

  problemInfo$: Observable<Category>;
  warrantInfo$: Observable<Category>;
  ngOnInit(): void {


    this.categoryService.getSubCategory('warrant').subscribe(warrant => {
      this.formGroup.controls['warrant'].setValue(warrant[0].text,);
    })
    this.categoryService.getSubCategory('problem').subscribe(problem => 
      {
        this.formGroup.controls['problem'].setValue(problem[0].text,);
      });
    this.problemInfo$ = this.categoryService.getInformation(ids.problem).valueChanges();
    this.warrantInfo$ = this.categoryService.getInformation(ids.warrant).valueChanges();

  }
  minLengthErrorMessage = "The problem should be described with at least 30 characters" ;
  requiredErrorMessage = "You must describe the problem before continuing" ;
  warrantMinLengthErrorMessage = "The warrayt should be described with at least 30 characters" ;
  warrantRequiredErrorMessage = "You must describe the problem warrant before continuing" ;

  nextActivity() {
    // Go to next activity in project
    this.projectService.updateProjectStage(routes.axixAlignmentActivity);
  }
  updateInitialProblem(event) {
    this.categoryService.updateSubCategory(event.target.value, 'problem')
  }

  updatelWarrant(event) {
    this.categoryService.updateSubCategory(event.target.value, 'warrant')
  }
  formGroup: FormGroup;
  displayHelp(content) {
    this.modalService.open(content, {ariaLabelledBy:"modal-basic-title"}).result.then((res)=>
    {
      if(res === "Yes") {
      }
    });
  }
  get problem() {return this.formGroup.get('problem');}
  get warrant() {return this.formGroup.get('warrant');}

}
