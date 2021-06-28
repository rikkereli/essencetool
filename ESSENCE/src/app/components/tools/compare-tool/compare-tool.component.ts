import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryOptions } from 'src/app/assets/categories';

@Component({
  selector: 'app-compare-tool',
  templateUrl: './compare-tool.component.html',
  styleUrls: ['./compare-tool.component.scss']
})
export class CompareToolComponent implements OnInit {

  category: CategoryOptions;

  constructor(@Inject(MAT_DIALOG_DATA) data) { 
    this.category = data.category;

  }

  ngOnInit(): void {
  }

}
