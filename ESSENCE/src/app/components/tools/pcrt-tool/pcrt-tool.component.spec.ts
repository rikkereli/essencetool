import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcrtToolComponent } from './pcrt-tool.component';

describe('PcrtToolComponent', () => {
  let component: PcrtToolComponent;
  let fixture: ComponentFixture<PcrtToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcrtToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcrtToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
