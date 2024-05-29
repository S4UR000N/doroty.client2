import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AngularMaterialFormModule } from '../../../module/angular-material-form.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppointmentSubService } from '../../../service/appointment-sub.service';
import IAppointmentModel from '../../../model/customer/appointment.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-update-appointment',
  standalone: true,
  imports: [MatDialogModule, AngularMaterialFormModule, MatIconModule],
  templateUrl: './update-appointment.dialog.html',
  styleUrl: './update-appointment.dialog.scss'
})
export class UpdateAppointmentDialog implements OnInit {
  public form: FormGroup = this.formBuilder.group({
    ref: [''],
    name: [''],
    description: [''],
    date: [''],
    startTime: [''],
    endTime: [''],
    medicine: ['']
  });
  
  constructor(
    private formBuilder: FormBuilder,
    private appointmentSubService: AppointmentSubService,
    public dialogRef: MatDialogRef<IAppointmentModel>,
    @Inject(MAT_DIALOG_DATA) public data: {path:string}
  ) {}

  
  async submit(event: MouseEvent): Promise<void> {
    (event.target as HTMLButtonElement).disabled = true;
    let model: IAppointmentModel = {
      ref: this.form.get('ref')?.value,
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      date: this.form.get('date')?.value,
      startTime: this.form.get('startTime')?.value,
      endTime: this.form.get('endTime')?.value,
      medicine: this.form.get('medicine')?.value
    };
    let res = await this.appointmentSubService.create(model);
    this.dialogRef.close(res.success);
  }
  async cancel(): Promise<void> {
    this.dialogRef.close();
  }

  async ngOnInit(): Promise<void> {
    this.appointmentSubService.Initialize(this.data.path)
  }
}
