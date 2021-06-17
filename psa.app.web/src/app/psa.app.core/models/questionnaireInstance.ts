import { Questionnaire } from './questionnaire';

export type QuestionnaireStatus =
  | 'inactive'
  | 'active'
  | 'in_progress'
  | 'released'
  | 'released_once'
  | 'released_twice'
  | 'expired'
  | 'deleted';

export interface QuestionnaireInstance {
  id: number;
  study_id: string;
  questionnaire_id: number;
  questionnaire_name: string;
  questionnaire_version: number;
  no_questions: number;
  no_answers: number;
  user_id: string;
  progress: number;
  date_of_issue: Date;
  date_of_release_v1: Date;
  date_of_release_v2: Date;
  cycle: number;
  notifications_scheduled: boolean;
  status: QuestionnaireStatus;
  questionnaire: Questionnaire;
}

export interface QuestionnaireInstanceResponse {
  questionnaireInstances: QuestionnaireInstance[];
  links: {
    self: { href: string };
  };
}
