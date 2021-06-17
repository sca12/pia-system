import { Component, OnInit } from '@angular/core';
import { SampleTrackingService } from '../../../psa.app.core/providers/sample-tracking-service/sample-tracking.service';
import { LabResult } from '../../../psa.app.core/models/labresult';
import { User } from '../../../psa.app.core/models/user';
import { ActivatedRoute } from '@angular/router';
import { QuestionnaireService } from 'src/app/psa.app.core/providers/questionnaire-service/questionnaire-service';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationManager } from '../../../_services/authentication-manager.service';
import { ComplianceManager } from '../../../_services/compliance-manager.service';
import { AlertService } from '../../../_services/alert.service';

@Component({
  templateUrl: './laboratory-results.component.html',
})
export class LaboratoryResultsComponent implements OnInit {
  showEmptyResultTable = false;
  showLaboratoryResultTable = false;
  labResultsList: LabResult[];
  isLoading = true;
  user_id = null;
  currentRole: string;

  constructor(
    private sampleTrackingService: SampleTrackingService,
    private translate: TranslateService,
    private questionnaireService: QuestionnaireService,
    private auth: AuthenticationManager,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    this.currentRole = currentUser.role;
    this.route.params.subscribe(async (params) => {
      this.user_id = params['user_id']
        ? params['user_id']
        : currentUser.username;
      try {
        this.labResultsList =
          await this.sampleTrackingService.getAllLabResultsForUser(
            this.user_id
          );
      } catch (err) {
        this.alertService.errorObject(err);
        this.labResultsList = [];
      }
      this.isLoading = false;
      if (this.labResultsList.length === 0) {
        this.showEmptyResultTable = true;
      } else {
        this.showLaboratoryResultTable = true;
      }
    });
  }
}
