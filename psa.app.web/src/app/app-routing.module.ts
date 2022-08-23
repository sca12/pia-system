﻿/*
 * SPDX-FileCopyrightText: 2021 Helmholtz-Zentrum für Infektionsforschung GmbH (HZI) <PiaPost@helmholtz-hzi.de>
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuestionnairesResearcherComponent } from './pages/questionnaires/questionnaires-researcher/questionnaires-researcher.component';
import { QuestionnaireResearcherComponent } from './pages/questionnaires/questionnaire-researcher/questionnaire-researcher.component';
import { QuestionProbandComponent } from './pages/questionnaires/question-proband/question-proband.component';
import { ProbandsComponent } from './pages/probands/probands/probands.component';
import { CollectiveSampleLettersComponent } from './features/collective-sample-letters/collective-sample-letters.component';
import { CollectiveLoginLettersComponent } from './features/collective-login-letters/collective-login-letters.component';
import { ProbandComponent } from './pages/probands/proband/proband.component';
import { QuestionnaireInstancesComponent } from './pages/questionnaires/questionnaire-instances/questionnaire-instances.component';
import { StudiesComponent } from './pages/studies/studies/studies.component';
import { StudyAccessesComponent } from './pages/studies/study-accesses/study-accesses.component';
import { InternalUsersComponent } from './pages/internal-users/internal-users.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SampleManagementComponent } from './pages/samples/sample-management/sample-management.component';
import { PlannedProbandsComponent } from './pages/planned-probands/planned-probands.component';
import { SamplesComponent } from './pages/samples/samples/samples.component';
import { LaboratoryResultsComponent } from './pages/laboratories/laboratory-results/laboratory-results.component';
import { LaboratoryResultDetailsComponent } from './pages/laboratories/laboratory-result-details/laboratory-result-details.component';
import { ProbandsPersonalInfoComponent } from './pages/probands/probands-personal-info/probands-personal-info.component';
import { ProbandPersonalInfoComponent } from './pages/probands/proband-personal-info/proband-personal-info.component';
import { ContactProbandComponent } from './pages/probands/contact-proband/contact-proband.component';
import { LogsDeleteSysAdminComponent } from './pages/logsDelete-sysAdmin/logsDelete-sysAdmin.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ComplianceResearcherComponent } from './pages/compliance/compliance-researcher/compliance-researcher.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './_guards/auth.guard';
import { ComplianceGuard } from './_guards/compliance.guard';
import { PendingChangesGuard } from './_guards/pending-changes.guard';
import { ComplianceType } from './psa.app.core/models/compliance';
import { ProbandsToContactComponent } from './pages/probands-to-contact/probands-to-contact.component';
import { ComplianceManagerComponent } from './pages/compliance/compliance-manager/compliance-manager.component';
import { ComplianceExaminerComponent } from './pages/compliance/compliance-examiner/compliance-examiner.component';
import { StudyWelcomeTextComponent } from './pages/study-welcome-text/study-welcome-text.component';
import { QuestionnaireInstancesListForProbandComponent } from './pages/questionnaire-instances/questionnaire-instances-list-for-proband/questionnaire-instances-list-for-proband.component';
import { QuestionnaireInstancesListForInvestigatorComponent } from './pages/questionnaire-instances/questionnaire-instances-list-for-investigator/questionnaire-instances-list-for-investigator.component';
import { LicenseListComponent } from './pages/license-list/license-list.component';
import { ComplianceEditProbandComponent } from './pages/compliance/compliance-edit/compliance-edit-proband/compliance-edit-proband.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard, ComplianceGuard],
    pathMatch: 'full',
  },
  {
    path: 'probands-to-contact',
    component: ProbandsToContactComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['ProbandenManager'] },
    pathMatch: 'full',
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [AuthGuard, ComplianceGuard],
    data: { authorizedRoles: ['Proband'] },
    pathMatch: 'full',
  },
  {
    path: 'questionnaires/user',
    component: QuestionnaireInstancesListForProbandComponent,
    canActivate: [AuthGuard, ComplianceGuard],
    data: { authorizedRoles: ['Proband'] },
    pathMatch: 'full',
  },
  {
    path: 'studies/:studyName/probands/:pseudonym/questionnaireInstances',
    component: QuestionnaireInstancesListForInvestigatorComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['Untersuchungsteam'] },
    pathMatch: 'full',
  },
  {
    path: 'questionnaires/admin',
    component: QuestionnairesResearcherComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['Forscher'] },
    pathMatch: 'full',
  },
  {
    path: 'questionnaire',
    component: QuestionnaireResearcherComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['Forscher'] },
    pathMatch: 'full',
  },
  {
    path: 'deletelogs',
    component: LogsDeleteSysAdminComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['SysAdmin'] },
    pathMatch: 'full',
  },
  {
    path: 'probands',
    component: ProbandsComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['Forscher', 'Untersuchungsteam'] },
    pathMatch: 'full',
  },
  {
    path: 'probands/:pseudonym',
    component: ProbandComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['Untersuchungsteam'] },
    pathMatch: 'full',
  },
  {
    path: 'contact-proband',
    component: ContactProbandComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['ProbandenManager'] },
    pathMatch: 'full',
  },
  {
    path: 'contact-proband/:usernames',
    component: ContactProbandComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['ProbandenManager'] },
    pathMatch: 'full',
  },
  {
    path: 'probands-personal-info',
    component: ProbandsPersonalInfoComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['ProbandenManager'] },
    pathMatch: 'full',
  },
  {
    path: 'probands-personal-info/:username',
    component: ProbandPersonalInfoComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['ProbandenManager'] },
    pathMatch: 'full',
  },
  {
    path: 'studies',
    component: StudiesComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['SysAdmin', 'Forscher'] },
    pathMatch: 'full',
  },
  {
    path: 'welcome-text',
    component: StudyWelcomeTextComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['Forscher'] },
    pathMatch: 'full',
  },
  {
    path: 'studies/:name/users',
    component: StudyAccessesComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['SysAdmin'] },
    pathMatch: 'full',
  },
  {
    path: 'questionnaire/:id/:version/edit',
    component: QuestionnaireResearcherComponent,
    canActivate: [AuthGuard],
    canDeactivate: [PendingChangesGuard],
    data: { authorizedRoles: ['Forscher'] },
    pathMatch: 'full',
  },
  {
    path: 'extlink/questionnaire/:id/:instanceId',
    redirectTo: 'questionnaire/:id/:instanceId',
    pathMatch: 'full',
  },
  {
    path: 'extlink/questionnaire/:id/:instanceId',
    redirectTo: 'questionnaire/:id/:instanceId',
    pathMatch: 'full',
  },
  {
    path: 'questionnaire/:id/:instanceId',
    component: QuestionProbandComponent,
    canActivate: [AuthGuard, ComplianceGuard],
    canDeactivate: [PendingChangesGuard],
    data: { authorizedRoles: ['Proband', 'Forscher', 'Untersuchungsteam'] },
    pathMatch: 'full',
  },
  {
    path: 'questionnaireInstances/:username',
    component: QuestionnaireInstancesComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['Forscher', 'ProbandenManager'] },
    pathMatch: 'full',
  },
  {
    path: 'internalUsers',
    component: InternalUsersComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['SysAdmin'] },
    pathMatch: 'full',
  },
  {
    path: 'compliance/agree',
    component: ComplianceEditProbandComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['Proband'] },
    pathMatch: 'full',
  },
  {
    path: 'compliance/setup',
    component: ComplianceResearcherComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['Forscher'] },
    pathMatch: 'full',
  },
  {
    path: 'compliance/view',
    component: ComplianceManagerComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['EinwilligungsManager'] },
    pathMatch: 'full',
  },
  {
    path: 'compliance/management',
    component: ComplianceExaminerComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['Untersuchungsteam'] },
    pathMatch: 'full',
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard, ComplianceGuard],
    data: { authorizedRoles: ['Proband'] },
    pathMatch: 'full',
  },
  {
    path: 'licenses',
    component: LicenseListComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: 'sample-management',
    component: SampleManagementComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['ProbandenManager'] },
    pathMatch: 'full',
  },
  {
    path: 'sample-management/:pseudonym',
    component: SamplesComponent,
    canActivate: [AuthGuard],
    data: {
      authorizedRoles: ['ProbandenManager', 'Untersuchungsteam', 'Forscher'],
    },
    pathMatch: 'full',
  },
  {
    path: 'laboratory-results',
    component: LaboratoryResultsComponent,
    canActivate: [AuthGuard, ComplianceGuard],
    data: {
      authorizedRoles: ['Proband', 'Forscher'],
      expectedCompliances: [ComplianceType.LABRESULTS],
    },
    pathMatch: 'full',
  },
  {
    path: 'laboratory-results/:id',
    component: LaboratoryResultDetailsComponent,
    canActivate: [AuthGuard, ComplianceGuard],
    data: {
      authorizedRoles: ['Proband', 'Forscher'],
      expectedCompliances: [ComplianceType.LABRESULTS],
    },
    pathMatch: 'full',
  },
  {
    path: 'planned-probands',
    component: PlannedProbandsComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['Untersuchungsteam'] },
    pathMatch: 'full',
  },
  {
    path: 'collective-login-letters',
    component: CollectiveLoginLettersComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['Untersuchungsteam'] },
    pathMatch: 'full',
  },
  {
    path: 'collective-sample-letters',
    component: CollectiveSampleLettersComponent,
    canActivate: [AuthGuard],
    data: { authorizedRoles: ['ProbandenManager'] },
    pathMatch: 'full',
  },
  // Otherwise redirect to home
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
