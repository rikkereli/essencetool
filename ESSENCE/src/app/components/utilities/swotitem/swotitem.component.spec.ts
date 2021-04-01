import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwotitemComponent } from './swotitem.component';

describe('SwotitemComponent', () => {
  let component: SwotitemComponent;
  let fixture: ComponentFixture<SwotitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwotitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwotitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
