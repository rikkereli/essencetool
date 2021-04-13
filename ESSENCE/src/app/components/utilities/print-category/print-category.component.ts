import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  @Input() category: string;


  categoryInfo: Category;
  items$: Observable<CategoryItem[]>;
  ngOnInit(): void {
    this.categoryService.getCategory(this.category).subscribe(category => {
      this.categoryInfo = category
    })
    this.items$ = this.categoryItemService.getItems(this.category);
  }

}
