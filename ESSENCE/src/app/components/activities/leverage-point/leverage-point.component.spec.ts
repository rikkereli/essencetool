import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeveragePointComponent } from './leverage-point.component';

describe('LeveragePointComponent', () => {
  let component: LeveragePointComponent;
  let fixture: ComponentFixture<LeveragePointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeveragePointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeveragePointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
