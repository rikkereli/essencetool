import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextActivityComponent } from './next-activity.component';

describe('NextActivityComponent', () => {
  let component: NextActivityComponent;
  let fixture: ComponentFixture<NextActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
