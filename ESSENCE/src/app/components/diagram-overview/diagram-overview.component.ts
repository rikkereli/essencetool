import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-diagram-overview',
  templateUrl: './diagram-overview.component.html',
  styleUrls: ['./diagram-overview.component.scss']
})
// Display all available diagrams for user 
// Be able to add new diagram
export class DiagramOverviewComponent implements OnInit {

  constructor(
    public authService: AuthServiceService, 
    public categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    // Get available diagrams
  }
  createNewProject(name: string) {
    // Use the service to add a new project with desired name
    this.categoryService.addNewProject(name);
  }
}
