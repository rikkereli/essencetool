import { Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoryitemService } from 'src/app/services/categoryitem.service';
import { Category, CategoryItem, Status } from '../../../model';
import { CategoryService } from '../../../services/category.service';


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
  @Input() parentCategory: string = "";
  @Input() categoryItem: CategoryItem;

  @Output() focusOnEmptyInputEvent = new EventEmitter<string>();
  @Output() focusOutOfEmptyInputEvent = new EventEmitter<CategoryItem>();
  @Output() textChangedEvent = new EventEmitter<CategoryItem>();
  @Output() itemStatusChangedEvent = new EventEmitter<CategoryItem>();

  connectTooltip = "Connect highlighted item to this item";
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
  categoryInfo: {itemId: string, parentCategory: string};
  onChanged: any = () => {};
  onTouched: any = () => {};

  subCategory$: Observable<Category>;
  constructor(
    private fb: FormBuilder,
    public categoryItemService: CategoryitemService,
    public categoryService: CategoryService
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
    this.categoryInfo = { itemId: this.categoryItem.id, parentCategory: this.parentCategory};
    if(this.categoryItem.subcategory) {
      this.subCategory$ = this.categoryService.getCategory(this.categoryItem.subcategory);
    }
  }
  formGroup;
  
  updateItemText(val: any) {
    this.categoryItem.text = val.target.value;

    this.textChangedEvent.next(this.categoryItem);
  }

  toogleActive() {
    if(this.categoryItem.status === Status.active) {
      this.categoryItem.status = Status.inactive;
    }
    else {
      this.categoryItem.status = Status.active;
    }
    this.itemStatusChangedEvent.next(this.categoryItem);
  }
}
