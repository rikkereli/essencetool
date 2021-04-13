import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectScenarioQuadrantComponent } from './prospect-scenario-quadrant.component';

describe('ProspectScenarioQuadrantComponent', () => {
  let component: ProspectScenarioQuadrantComponent;
  let fixture: ComponentFixture<ProspectScenarioQuadrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectScenarioQuadrantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectScenarioQuadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
