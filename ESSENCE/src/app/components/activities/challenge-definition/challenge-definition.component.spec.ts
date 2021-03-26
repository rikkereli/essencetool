import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeDefinitionComponent } from './challenge-definition.component';

describe('ChallengeDefinitionComponent', () => {
  let component: ChallengeDefinitionComponent;
  let fixture: ComponentFixture<ChallengeDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeDefinitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
