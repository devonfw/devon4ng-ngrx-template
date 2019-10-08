import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

/* @export
 * @class SampleDataDialogComponent
 */
@Component({
  selector: 'public-sampledata-dialog',
  templateUrl: './sampledata-dialog.component.html',
})
export class SampleDataDialogComponent {
  title: string;
  items: any = {
    name: '',
    surname: '',
    age: '',
    mail: '',
  };

  /* Creates an instance of SampleDataDialogComponent.
   * @param {TranslateService} translate
   * @param {MatDialogRef<SampleDataDialogComponent>} dialogRef
   * @param {*} dialogData
   * @memberof SampleDataDialogComponent
   */
  constructor(
    private translate: TranslateService,
    public dialogRef: MatDialogRef<SampleDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData: any,
  ) {
    if (!dialogData) {
      this.title = this.getTranslation('sampledatamanagement.addTitle');
    } else {
      this.title = this.getTranslation('sampledatamanagement.editTitle');
      this.items = { ...dialogData };
    }
  }

  /* @param {string} text
   * @returns {string}
   * @memberof SampleDataDialogComponent
   */
  getTranslation(text: string): string {
    let value: string;
    this.translate.get(text).subscribe((res: any) => {
      value = res;
    });
    return value;
  }
}
