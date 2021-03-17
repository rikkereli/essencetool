import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CategoryService } from 'src/app/services/category.service';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = "ESSENCE";
  constructor(
    public authService: AuthServiceService, 
    public categoryService: CategoryService
    ) { }

  ngOnInit(): void {
    this.categoryService.getUserDiagrams().valueChanges();
  }

}
