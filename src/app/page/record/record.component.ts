import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import ICustomerModel from '../../model/customer/customer.interface';
import { CustomerService } from '../../service/customer.service';
import { CreateCustomerDialog } from '../../dialog/create-customer/create-customer.dialog';
import { AlertService } from '../../service/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [],
  templateUrl: './record.component.html',
  styleUrl: './record.component.scss'
})
export class RecordComponent implements OnInit {
  public customers: ICustomerModel[] = [];

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private alertService: AlertService,
    public dialog: MatDialog
  ) {}

  async openCreateDialog(): Promise<void> {
    this.dialog.open(CreateCustomerDialog).afterClosed().subscribe(success => {
      if (success) {
        this.alertService.showAlert('success', 'Klijent uspiješno kreiran.');
        this.customerService.readMany().then(res => {
          this.customers = res.result!;
        });
      }
      else {
        this.alertService.showAlert('fail', 'Klijent nije kreiran.');
      }
    });
  }

  async redirect(customer: ICustomerModel) {
    this.router.navigate(['customer', customer.ref!.id], {relativeTo: this.route});
  }

  async ngOnInit(): Promise<void> {
    this.customers = (await this.customerService.readMany()).result!;
  }
}
