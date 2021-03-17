import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramDisplayItemComponent } from './diagram-display-item.component';

describe('DiagramDisplayItemComponent', () => {
  let component: DiagramDisplayItemComponent;
  let fixture: ComponentFixture<DiagramDisplayItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagramDisplayItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramDisplayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
