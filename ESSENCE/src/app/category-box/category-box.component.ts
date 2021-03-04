import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

export enum Views {
  Paradigm = "paradigm", 
  Process = "process", 
  Product = "product",
  Project = "project"
}

@Component({
  selector: 'app-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.scss']
})
export class CategoryBoxComponent implements AfterViewInit, OnInit {
  @Input() title: string = "undefined";
  @Input() boxView: string = "";  
  @Input() items: string[] = [];
  constructor() { }

  view: Views = Views.Process;
  ngOnInit(): void {
    //document.documentElement.style.setProperty('view-color', '#fff');
    this.view = this.boxView as Views;
  }
  ngAfterViewInit() {
    const options: any = {
      watch: true,
      preserveStatic: false,
      variables: {

      }
    }
  }
}
