import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCategoryOverviewComponent } from './print-category-overview.component';

describe('PrintCategoryOverviewComponent', () => {
  let component: PrintCategoryOverviewComponent;
  let fixture: ComponentFixture<PrintCategoryOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintCategoryOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintCategoryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
