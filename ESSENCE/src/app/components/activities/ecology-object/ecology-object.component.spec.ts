import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcologyObjectComponent } from './ecology-object.component';

describe('EcologyObjectComponent', () => {
  let component: EcologyObjectComponent;
  let fixture: ComponentFixture<EcologyObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcologyObjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcologyObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
