import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(    public authService: AuthServiceService, 
    public categoryService: CategoryService) { }

  ngOnInit(): void {
  }

}
