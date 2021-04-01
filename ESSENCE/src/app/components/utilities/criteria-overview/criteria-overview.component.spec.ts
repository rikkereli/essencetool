import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaOverviewComponent } from './criteria-overview.component';

describe('CriteriaOverviewComponent', () => {
  let component: CriteriaOverviewComponent;
  let fixture: ComponentFixture<CriteriaOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriaOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
