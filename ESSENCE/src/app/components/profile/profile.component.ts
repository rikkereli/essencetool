import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(    public authService: AuthService, 
    public categoryService: CategoryService) { }

  ngOnInit(): void {
  }
  updateName(event) {
    this.authService.updateName(event.target.value);
  }

}
