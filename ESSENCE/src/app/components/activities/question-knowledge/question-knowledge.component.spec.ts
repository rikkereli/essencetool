import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionKnowledgeComponent } from './question-knowledge.component';

describe('QuestionKnowledgeComponent', () => {
  let component: QuestionKnowledgeComponent;
  let fixture: ComponentFixture<QuestionKnowledgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionKnowledgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionKnowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
