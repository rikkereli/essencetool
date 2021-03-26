import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RstReviewComponent } from './rst-review.component';

describe('RstReviewComponent', () => {
  let component: RstReviewComponent;
  let fixture: ComponentFixture<RstReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RstReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RstReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
