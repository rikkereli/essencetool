import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCategoryComponent } from './print-category.component';

describe('PrintCategoryComponent', () => {
  let component: PrintCategoryComponent;
  let fixture: ComponentFixture<PrintCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
