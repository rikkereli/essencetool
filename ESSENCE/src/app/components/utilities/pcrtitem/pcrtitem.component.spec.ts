import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcrtitemComponent } from './pcrtitem.component';

describe('PcrtitemComponent', () => {
  let component: PcrtitemComponent;
  let fixture: ComponentFixture<PcrtitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcrtitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcrtitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
