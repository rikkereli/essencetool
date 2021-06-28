import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories, CategoryOptions, ViewOptions } from 'src/app/assets/categories';
import { Category, CategoryItem } from 'src/app/model';
import { CategoryBoxService } from 'src/app/services/category-box.service';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryitemService } from 'src/app/services/categoryitem.service';
import { FirestoreReferencesService } from 'src/app/services/firestore-references.service';

@Component({
  selector: 'app-print-category',
  templateUrl: './print-category.component.html',
  styleUrls: ['./print-category.component.scss']
})
export class PrintCategoryComponent implements OnInit {

  constructor(
    public firestoreReferenceService: FirestoreReferencesService,
    public categoryService: CategoryService,
    public categoryItemService: CategoryitemService
  ) { 
  }

  @Input() category: CategoryOptions;

  view: ViewOptions;
  categoryInfo: Categories = new Categories();
  items$: Observable<CategoryItem[]>;
  ngOnInit(): void {
    this.view = this.categoryInfo.getView(this.category)
    this.items$ = this.categoryItemService.getItems(this.category);
  }

}
