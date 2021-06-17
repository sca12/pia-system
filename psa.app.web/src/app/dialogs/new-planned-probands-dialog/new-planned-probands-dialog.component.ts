import {
  Component,
  Inject,
  OnInit,
  ViewChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { AlertService } from '../../_services/alert.service';
import { AuthService } from 'src/app/psa.app.core/providers/auth-service/auth-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../psa.app.core/models/user';
import { PlannedProband } from 'src/app/psa.app.core/models/plannedProband';

@Component({
  selector: 'new-planned-probands-dialog',
  templateUrl: 'new-planned-probands-dialog.component.html',
})
export class DialogNewPlannedProbandsComponent
  implements OnInit, AfterViewInit
{
  form: FormGroup;
  currentPlannedProbands: PlannedProband[] = [];
  currentRole: string;
  wasPosted: boolean = false;
  @ViewChildren('input') inputs: QueryList<any>;

  constructor(
    public dialogRef: MatDialogRef<DialogNewPlannedProbandsComponent>,
    private authService: AuthService,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const jwtHelper: JwtHelperService = new JwtHelperService();
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    const tokenPayload = jwtHelper.decodeToken(currentUser.token);
    this.currentRole = tokenPayload.role;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngAfterViewInit(): void {
    this.inputs.changes.subscribe((list) => {
      setTimeout(() => {
        if (list.last) {
          list.last.nativeElement.focus();
        }
      });
    });
  }

  buildForm(): void {
    this.form = new FormGroup({
      pseudonyms: new FormArray([]),
    });
    this.addPlannedProband();
  }

  addPlannedProband(): void {
    this.currentPlannedProbands.push({
      user_id: '',
      password: '',
      activated_at: null,
      wasCreated: null,
    });
    (this.form.controls['pseudonyms'] as FormArray).push(
      new FormControl('', Validators.required)
    );
  }

  getPseudonymsControl(): FormArray {
    return this.form.controls['pseudonyms'] as FormArray;
  }

  removePlannedProband(index: number): void {
    this.currentPlannedProbands.splice(index, 1);
    const pseudonymsControl = this.form.controls['pseudonyms'] as FormArray;
    pseudonymsControl.removeAt(index);
  }

  submit(): void {
    this.filterEmptyPlannedProbands();
    this.authService.postPlannedProbands(this.form.value).then(
      (result: PlannedProband[]) => {
        result.forEach((plannedProbandNew: PlannedProband, index) => {
          if (!this.currentPlannedProbands[index].password) {
            this.currentPlannedProbands[index] = plannedProbandNew;
          } else if (!this.currentPlannedProbands[index].wasCreated) {
            this.currentPlannedProbands[index].wasCreated =
              plannedProbandNew.wasCreated;
          }
        });
        this.wasPosted = true;
      },
      (err: any) => {
        this.alertService.errorObject(err);
      }
    );
  }

  filterEmptyPlannedProbands(): void {
    const emptyIndices = [];
    this.form.value['pseudonyms'].forEach((value, index) => {
      if (value === '' || value === null) {
        emptyIndices.push(index);
      }
    });
    emptyIndices.forEach((index) => {
      this.removePlannedProband(index);
    });
  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }

  closeDialogAndPrint(): void {
    const createdPlannedProbands = this.currentPlannedProbands.filter(
      (plannedProband: PlannedProband) => {
        return plannedProband.wasCreated;
      }
    );
    this.dialogRef.close(createdPlannedProbands);
  }

  moveToNextField(index): void {
    if (this.currentPlannedProbands.length <= index + 1) {
      this.addPlannedProband();
    } else {
      this.inputs.toArray()[index + 1].nativeElement.focus();
    }
  }
}
