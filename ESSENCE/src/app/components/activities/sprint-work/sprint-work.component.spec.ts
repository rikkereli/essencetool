import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintWorkComponent } from './sprint-work.component';

describe('SprintWorkComponent', () => {
  let component: SprintWorkComponent;
  let fixture: ComponentFixture<SprintWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
