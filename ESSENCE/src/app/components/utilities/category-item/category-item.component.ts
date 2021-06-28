import { Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { Categories, CategoryOptions } from 'src/app/assets/categories';
import { CategoryUpdateService } from 'src/app/services/category-update.service';
import { CategoryitemService } from 'src/app/services/categoryitem.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProjectService } from 'src/app/services/project.service';
import { Category, CategoryItem, Status } from '../../../model';
import { CategoryService } from '../../../services/category.service';
import * as routes from "../../../assets/routes"

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategoryItemComponent),
      multi: true
    }
  ]
})


export class CategoryItemComponent implements ControlValueAccessor, OnInit {
  @Input() text: String = "";  
  @Input() id: {itemId: string, parentCategory: CategoryOptions};
  @Input() parentCategory: CategoryOptions = "none";
  @Input() categoryItem: CategoryItem;

  @Output() focusOnEmptyInputEvent = new EventEmitter<string>();
  @Output() focusOutOfEmptyInputEvent = new EventEmitter<CategoryItem>();
  @Output() itemChangedEvent = new EventEmitter<CategoryItem>();

  categoryHelp: Categories = new Categories();
  connectTooltip = "When this button is active, connect to items in connect categories by clicking the items";
  // If we click on an empty box, send event to parent
  addBox(event) {
    if(event.target.value === "") {
      this.focusOnEmptyInputEvent.next(this.categoryItem.id);
    }
  }
  deleteBox(event) {
    if(event.target.value === "") {
      this.focusOutOfEmptyInputEvent.next(this.categoryItem);
    }
  }
  onChanged: any = () => {};
  onTouched: any = () => {};

  subCategory$: Observable<Category>;
  constructor(
    private fb: FormBuilder,
    public categoryItemService: CategoryitemService,
    public categoryService: CategoryService,
    public navbarService: NavbarService, 
    public categoryUpdateService: CategoryUpdateService,
    public projectService: ProjectService
    ) {

     }
  writeValue(obj: any): void {
    this.text = obj;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  ngOnInit(): void {
    if(this.categoryItem.subcategory) {
      this.subCategory$ = this.categoryService.getCategory(this.categoryItem.subcategory);
    }
  }
  formGroup;
  
  updateItemText(val: any) {    
    this.categoryItem.text = val.target.value;

    this.itemChangedEvent.next(this.categoryItem);
    this.categoryUpdateService.categoryUpdated(this.parentCategory);
  }
}
