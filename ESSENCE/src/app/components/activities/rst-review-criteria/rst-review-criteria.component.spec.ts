import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RstReviewCriteriaComponent } from './rst-review-criteria.component';

describe('RstReviewCriteriaComponent', () => {
  let component: RstReviewCriteriaComponent;
  let fixture: ComponentFixture<RstReviewCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RstReviewCriteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RstReviewCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
