import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import ICustomerModel from '../../model/customer/customer.interface';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCustomerDialog } from '../../dialog/customer/update-customer/update-customer.dialog';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-customer-fragment',
  standalone: true,
  imports: [],
  templateUrl: './customer-fragment.component.html',
  styleUrl: './customer-fragment.component.scss'
})
export class CustomerFragmentComponent implements OnInit {
  public customer: ICustomerModel = {
    name: '',
    age: '' as any,
    gender: '' as any,
    phone: '' as any,
    address: '',
    description: '',
    alergies: '',
    status: '' as any
  };
  public constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private alertService: AlertService,
    public dialog: MatDialog
  ) {}

  calculateAge(yearOfBirth: any) {
    return (new Date().getFullYear() - parseInt(yearOfBirth));
  }

  async update(customer: ICustomerModel): Promise<void> {
    this.dialog.open(UpdateCustomerDialog, {data: customer}).afterClosed().subscribe(success => {
      if (success) {
        this.alertService.showAlert('success', 'Klijent uspiješno ažuriran.');
        this.customerService.readMany().then(_ => {
          this.customerService.readOneById(this.route.snapshot.params['customerId']).then(res => {
            this.customer = res.result!
          })
        });
      }
      else {
        this.alertService.showAlert('fail', 'Ažuriranje nije uspijelo.');
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.customer = (await this.customerService.readOneById(this.route.snapshot.params['customerId'])).result!;
  }
}