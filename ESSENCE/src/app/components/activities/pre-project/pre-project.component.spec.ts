import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreProjectComponent } from './pre-project.component';

describe('PreProjectComponent', () => {
  let component: PreProjectComponent;
  let fixture: ComponentFixture<PreProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
