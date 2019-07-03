import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './sample-data-alert.component.html',
  styleUrls: ['./sample-data-alert.component.scss'],
})
export class SampleDataAlertComponent implements OnInit {
  message: string = '';
  title: string = '';
  cancelButton: string = 'Cancel';
  acceptButton: string = 'Delete';
  constructor(
    public dialogRef: MatDialogRef<SampleDataAlertComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
  ) {}

  ngOnInit(): void {
    if (this.dialogData) {
      this.message = this.dialogData.message;
      this.title = this.dialogData.title;
      this.cancelButton = this.dialogData.cancelButton;
      this.acceptButton = this.dialogData.acceptButton;
    }
  }
}
