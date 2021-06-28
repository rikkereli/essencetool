import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwotToolComponent } from './swot-tool.component';

describe('SwotToolComponent', () => {
  let component: SwotToolComponent;
  let fixture: ComponentFixture<SwotToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwotToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwotToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
