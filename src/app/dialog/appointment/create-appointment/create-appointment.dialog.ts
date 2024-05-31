import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AngularMaterialFormModule } from '../../../module/angular-material-form.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppointmentSubService } from '../../../service/appointment-sub.service';
import IAppointmentModel from '../../../model/customer/appointment.interface';
import { MatIconModule } from '@angular/material/icon';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [MatDialogModule, AngularMaterialFormModule, MatIconModule],
  templateUrl: './create-appointment.dialog.html',
  styleUrl: './create-appointment.dialog.scss',
  providers: [
    {provide: DateAdapter, useClass: NativeDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}
  ]
})
export class CreateAppointmentDialog implements OnInit {
  public form: FormGroup = this.formBuilder.group({
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

  async selectDate(event: MatDatepickerInputEvent<any, any>) {
    let date = new Date(event.value);
    let dateString = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    this.form.patchValue({date: dateString});
  }

  async ngOnInit(): Promise<void> {
    this.appointmentSubService.Initialize(this.data.path)
  }
}
