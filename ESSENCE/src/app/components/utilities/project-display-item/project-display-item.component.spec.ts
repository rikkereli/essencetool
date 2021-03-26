import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDisplayItemComponent } from './project-display-item.component';

describe('ProjectDisplayItemComponent', () => {
  let component: ProjectDisplayItemComponent;
  let fixture: ComponentFixture<ProjectDisplayItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDisplayItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDisplayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
