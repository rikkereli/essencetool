import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-next-activity',
  templateUrl: './next-activity.component.html',
  styleUrls: ['./next-activity.component.scss']
})
export class NextActivityComponent implements OnInit {

  disabled: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
