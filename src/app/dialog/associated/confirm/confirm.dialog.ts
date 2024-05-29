import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AngularMaterialFormModule } from '../../../module/angular-material-form.module';
import ConfrimDialogModel from '../../../model/dialog/confirm-dialog.model';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [MatButton, MatDialogModule, AngularMaterialFormModule],
  templateUrl: './confirm.dialog.html',
  styleUrl: './confirm.dialog.scss'
})
export class ConfirmDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfrimDialogModel)
  {

  }

  async confirm(): Promise<void> {
    await this.data.action();
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
