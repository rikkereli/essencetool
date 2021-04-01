import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintInitiationComponent } from './sprint-initiation.component';

describe('SprintInitiationComponent', () => {
  let component: SprintInitiationComponent;
  let fixture: ComponentFixture<SprintInitiationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintInitiationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintInitiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
