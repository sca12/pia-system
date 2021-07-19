import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { QuestionnaireAnswerControlValueAccessor } from '../questionnaire-answer-control-value-accessor/questionnaire-answer-control-value-accessor';

const QUESTIONNAIRE_ANSWER_IMAGE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => QuestionnaireAnswerImageComponent),
  multi: true,
};

@Component({
  selector: 'app-questionnaire-answer-image',
  templateUrl: './questionnaire-answer-image.component.html',
  providers: [QUESTIONNAIRE_ANSWER_IMAGE_ACCESSOR],
})
export class QuestionnaireAnswerImageComponent extends QuestionnaireAnswerControlValueAccessor {
  private readonly cameraOptions: CameraOptions = {
    destinationType: this.camera.DestinationType.DATA_URL,
    targetWidth: 1000,
    targetHeight: 1000,
  };

  constructor(private camera: Camera, private chooser: Chooser) {
    super();
  }

  async onOpenCamera() {
    try {
      const imageData = await this.camera.getPicture(this.cameraOptions);
      if (imageData) {
        const base64Image = 'data:image/jpeg;base64,' + imageData;
        this.control.setValue({ fileName: imageData.name, file: base64Image });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async onOpenChooser() {
    try {
      const imageData: ChooserResult = await this.chooser.getFile(
        'image/png, image/jpeg'
      );
      if (imageData) {
        this.control.setValue({
          fileName: imageData.name,
          file: imageData.dataURI,
        });
      }
    } catch (error) {
      console.warn(error);
    }
  }
}