import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './sampledata-alert.component.html',
  styleUrls: ['./sampledata-alert.component.scss'],
})
export class SampleDataAlertComponent implements OnInit {
  message = '';
  title = '';
  cancelButton = 'Cancel';
  acceptButton = 'Delete';
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
