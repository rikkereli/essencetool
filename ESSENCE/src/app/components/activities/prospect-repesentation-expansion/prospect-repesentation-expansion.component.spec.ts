import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectRepesentationExpansionComponent } from './prospect-repesentation-expansion.component';

describe('ProspectRepesentationExpansionComponent', () => {
  let component: ProspectRepesentationExpansionComponent;
  let fixture: ComponentFixture<ProspectRepesentationExpansionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectRepesentationExpansionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectRepesentationExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
