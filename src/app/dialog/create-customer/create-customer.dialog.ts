import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import ICustomerModel from '../../model/customer/customer.interface';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularMaterialFormModule } from '../../module/angular-material-form.module';
import CustomerStatus from '../../enum/customer-status.enum';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [MatDialogModule, AngularMaterialFormModule],
  templateUrl: './create-customer.dialog.html',
  styleUrl: './create-customer.dialog.scss'
})
export class CreateCustomerDialog {
  public form: FormGroup = this.formBuilder.group({
    name: [''],
    age: [''],
    gender: [''],
    phone: [''],
    address: [''],
    description: [''],
    alergies: [''],
    status: ['']
  });
  public customerStatus: CustomerStatus = CustomerStatus;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<ICustomerModel>,
  ) {}

  
  async submit(event: MouseEvent): Promise<void> {
    (event.target as HTMLButtonElement).disabled = true;
    let model: ICustomerModel = {
      name: this.form.get('name')?.value,
      age: this.form.get('age')?.value,
      gender: this.form.get('gender')?.value,
      phone: this.form.get('phone')?.value,
      address: this.form.get('address')?.value,
      description: this.form.get('description')?.value,
      alergies: this.form.get('alergies')?.value,
      status: this.form.get('status')?.value
    };
    let res = await this.customerService.create(model);
    this.dialogRef.close(res.success);
  }
  async cancel(): Promise<void> {
    this.dialogRef.close();
  }
}
