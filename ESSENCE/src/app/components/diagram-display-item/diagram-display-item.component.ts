import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Diagram } from 'src/app/model/diagram';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CategoryService } from 'src/app/services/category.service';
import * as routes from '../../assets/routes';

@Component({
  selector: 'app-diagram-display-item',
  templateUrl: './diagram-display-item.component.html',
  styleUrls: ['./diagram-display-item.component.scss']
})
export class DiagramDisplayItemComponent implements OnInit {

  @Input() diagramID;
  constructor(
    public authService: AuthServiceService, 
    public categoryService: CategoryService,
    public router: Router
  ) { }

  diagram$: Observable<Diagram>;
  ngOnInit(): void {
    this.diagram$ = this.categoryService.getDiagram(this.diagramID).valueChanges();
    this.categoryService.getDiagram(this.diagramID).valueChanges().subscribe(A=> {

    })

  }
  // When diagram is clicked, open the diagram 
  onDiagramClicked() {
    this.router.navigate([routes.diagramTool]);
  }
}