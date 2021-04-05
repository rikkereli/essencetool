import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-next-activity',
  templateUrl: './next-activity.component.html',
  styleUrls: ['./next-activity.component.scss']
})
export class NextActivityComponent implements OnInit {

  disabled: boolean = false;
  constructor(public navbarService: NavbarService) { }

  ngOnInit(): void {
  }

}
