import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInitialKnowledgeComponent } from './select-initial-knowledge.component';

describe('SelectInitialKnowledgeComponent', () => {
  let component: SelectInitialKnowledgeComponent;
  let fixture: ComponentFixture<SelectInitialKnowledgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectInitialKnowledgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectInitialKnowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
