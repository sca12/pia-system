import { TestBed } from '@angular/core/testing';

import { PrimaryStudyService } from './primary-study.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuestionnaireClientService } from '../../../questionnaire/questionnaire-client.service';

describe('PrimaryStudyClientService', () => {
  let service: PrimaryStudyService;

  let questionnaireClient: QuestionnaireClientService;

  beforeEach(() => {
    questionnaireClient = jasmine.createSpyObj('QuestionnaireClientService', [
      'getStudies',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: QuestionnaireClientService, useValue: questionnaireClient },
      ],
    });
    service = TestBed.inject(PrimaryStudyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});