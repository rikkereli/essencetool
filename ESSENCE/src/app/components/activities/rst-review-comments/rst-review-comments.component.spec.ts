import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RstReviewCommentsComponent } from './rst-review-comments.component';

describe('RstReviewCommentsComponent', () => {
  let component: RstReviewCommentsComponent;
  let fixture: ComponentFixture<RstReviewCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RstReviewCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RstReviewCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
