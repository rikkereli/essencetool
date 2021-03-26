import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RstReviewUpdateDiagramsComponent } from './rst-review-update-diagrams.component';

describe('RstReviewUpdateDiagramsComponent', () => {
  let component: RstReviewUpdateDiagramsComponent;
  let fixture: ComponentFixture<RstReviewUpdateDiagramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RstReviewUpdateDiagramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RstReviewUpdateDiagramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
