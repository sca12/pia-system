/*
 * SPDX-FileCopyrightText: 2021 Helmholtz-Zentrum für Infektionsforschung GmbH (HZI) <PiaPost@helmholtz-hzi.de>
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Request } from '@hapi/hapi';
import { RESTPresenter, RESTResponse } from '../services/RESTPresenter';
import { QuestionnairesInteractor } from '../interactors/questionnairesInteractor';
import { Questionnaire, QuestionnaireRequest } from '../models/questionnaire';
import { AccessToken } from '@pia/lib-service-core';

export class QuestionnairesHandler {
  /**
   * Creates a new questionnaire
   */
  public static async create(
    this: void,
    request: Request
  ): Promise<(RESTResponse & Questionnaire) | null> {
    const newQuestionnaire = request.payload as QuestionnaireRequest;

    const questionnaire: Questionnaire =
      await QuestionnairesInteractor.createQuestionnaire(
        request.auth.credentials as AccessToken,
        newQuestionnaire
      );
    return RESTPresenter.presentQuestionnaire(questionnaire);
  }

  /**
   * updates the questionnaire with the specified id
   */
  public static async update(
    this: void,
    request: Request
  ): Promise<(RESTResponse & Questionnaire) | null> {
    const id: number = request.params['id'] as number;
    const version: number = request.params['version'] as number;
    const newQuestionnaire = request.payload as QuestionnaireRequest;

    const questionnaire: Questionnaire =
      await QuestionnairesInteractor.updateQuestionnaire(
        request.auth.credentials as AccessToken,
        id,
        version,
        newQuestionnaire
      );
    return RESTPresenter.presentQuestionnaire(questionnaire);
  }

  /**
   * Revises the questionnaire from the specified id
   */
  public static async revise(
    this: void,
    request: Request
  ): Promise<(RESTResponse & Questionnaire) | null> {
    const id = request.params['id'] as number;
    const newQuestionnaire = request.payload as QuestionnaireRequest;

    const questionnaire: Questionnaire =
      await QuestionnairesInteractor.reviseQuestionnaire(
        request.auth.credentials as AccessToken,
        id,
        newQuestionnaire
      );
    return RESTPresenter.presentQuestionnaire(questionnaire);
  }

  /**
   * Gets the questionnaire
   */
  public static async getOne(
    this: void,
    request: Request
  ): Promise<(RESTResponse & Questionnaire) | null> {
    const id = request.params['id'] as number;
    const version = request.params['version'] as number;

    const questionnaire: Questionnaire =
      await QuestionnairesInteractor.getQuestionnaire(
        request.auth.credentials as AccessToken,
        id,
        version
      );
    return RESTPresenter.presentQuestionnaire(questionnaire);
  }

  /**
   * Get all questionnaires the user has access to
   * @param request
   */
  public static async getAll(
    this: void,
    request: Request
  ): Promise<RESTResponse & { questionnaires: Questionnaire[] }> {
    const questionnaires: Questionnaire[] =
      await QuestionnairesInteractor.getQuestionnaires(
        request.auth.credentials as AccessToken
      );
    return RESTPresenter.presentQuestionnaires(questionnaires);
  }

  /**
   * Deletes the questionnaire
   * @param request
   */
  public static async deleteOne(this: void, request: Request): Promise<null> {
    const id = request.params['id'] as number;
    const version = request.params['version'] as number;

    await QuestionnairesInteractor.deleteQuestionnaire(
      request.auth.credentials as AccessToken,
      id,
      version
    );
    return null;
  }

  /**
   * Deactivates the questionnaire
   * @param request
   */
  public static async patch(
    this: void,
    request: Request
  ): Promise<(RESTResponse & Questionnaire) | null> {
    const id = request.params['id'] as number;
    const version = request.params['version'] as number;
    const patchedQuestionnaireAttributes =
      request.payload as Partial<QuestionnaireRequest>;

    const questionnaire: Questionnaire = await QuestionnairesInteractor.patch(
      request.auth.credentials as AccessToken,
      id,
      version,
      patchedQuestionnaireAttributes
    );
    return RESTPresenter.presentQuestionnaire(questionnaire);
  }
}