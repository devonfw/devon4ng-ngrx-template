import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';

/* @export
 * @class SampleDataDialogComponent
 */
@Component({
  selector: 'app-sampledata-dialog',
  templateUrl: './sampledata-dialog.component.html',
})
export class SampleDataDialogComponent {
  title: string;
  items: any = {
    name: '',
    surname: '',
    age: '',
    email: '',
  };

  /* Creates an instance of SampleDataDialogComponent.
   * @param {TranslateService} translate
   * @param {MatDialogRef<SampleDataDialogComponent>} dialogRef
   * @param {*} dialogData
   * @memberof SampleDataDialogComponent
   */
  constructor(
    private translocoService: TranslocoService,
    public dialogRef: MatDialogRef<SampleDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData: any,
  ) {
    if (!dialogData) {
      this.title = this.translocoService.translate(
        'sampledatamanagement.addTitle',
      );
    } else {
      this.title = this.translocoService.translate(
        'sampledatamanagement.editTitle',
      );
      this.items = { ...dialogData };
    }
  }
}
