import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';

import { QuestionnaireAnswerErrorComponent } from './questionnaire-answer-error.component';

describe('QuestionnaireAnswerErrorComponent', () => {
  let component: QuestionnaireAnswerErrorComponent;
  let fixture: ComponentFixture<QuestionnaireAnswerErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuestionnaireAnswerErrorComponent,
        MockPipe(TranslatePipe),
      ],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionnaireAnswerErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
