import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectRepesentationGenerationComponent } from './prospect-repesentation-generation.component';

describe('ProspectRepesentationGenerationComponent', () => {
  let component: ProspectRepesentationGenerationComponent;
  let fixture: ComponentFixture<ProspectRepesentationGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectRepesentationGenerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectRepesentationGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
