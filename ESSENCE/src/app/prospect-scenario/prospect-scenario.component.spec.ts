import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectScenarioComponent } from './prospect-scenario.component';

describe('ProspectScenarioComponent', () => {
  let component: ProspectScenarioComponent;
  let fixture: ComponentFixture<ProspectScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectScenarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
