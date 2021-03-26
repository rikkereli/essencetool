import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxisAlignmentComponent } from './axis-alignment.component';

describe('AxisAlignmentComponent', () => {
  let component: AxisAlignmentComponent;
  let fixture: ComponentFixture<AxisAlignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AxisAlignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AxisAlignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
