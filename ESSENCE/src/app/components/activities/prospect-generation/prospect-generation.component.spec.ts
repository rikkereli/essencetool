import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectGenerationComponent } from './prospect-generation.component';

describe('ProspectGenerationComponent', () => {
  let component: ProspectGenerationComponent;
  let fixture: ComponentFixture<ProspectGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectGenerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
