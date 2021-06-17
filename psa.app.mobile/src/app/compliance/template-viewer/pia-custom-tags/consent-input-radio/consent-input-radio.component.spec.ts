import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MockModule } from 'ng-mocks';

import { ConsentInputRadioComponent } from './consent-input-radio.component';
import { SegmentType } from '../../../segment.model';

describe('ConsentInputRadioAppComponent', () => {
  let component: ConsentInputRadioComponent;
  let fixture: ComponentFixture<ConsentInputRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsentInputRadioComponent],
      imports: [MockModule(TranslateModule), MockModule(ReactiveFormsModule)],
    }).compileComponents();
  });

  it('should create and run ngOnInit with no error', fakeAsync(() => {
    fixture = TestBed.createComponent(ConsentInputRadioComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
    component.consentName = 'group';
    component.groupName = 'consent';
    component.segment = {
      type: SegmentType.CUSTOM_TAG,
      tagName: 'pia-consent-input-radio-generic',
      attrs: [{ name: 'name', value: 'myGenericConsent' }],
      children: [],
    };
    fixture.detectChanges();
    tick();
    expect(component).toBeTruthy();
  }));
});
