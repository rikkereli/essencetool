import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioToolComponent } from './scenario-tool.component';

describe('ScenarioToolComponent', () => {
  let component: ScenarioToolComponent;
  let fixture: ComponentFixture<ScenarioToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
