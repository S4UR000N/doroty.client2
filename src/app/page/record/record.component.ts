import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import ICustomerModel from '../../model/customer/customer.interface';
import { CustomerService } from '../../service/customer.service';
import { CreateCustomerDialog } from '../../dialog/customer/create-customer/create-customer.dialog';
import { AlertService } from '../../service/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentReference } from 'firebase/firestore';
import ConfrimDialogModel from '../../model/dialog/confirm-dialog.model';
import { ConfirmDialog } from '../../dialog/associated/confirm/confirm.dialog';
import { UpdateCustomerDialog } from '../../dialog/customer/update-customer/update-customer.dialog';

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

  async create(): Promise<void> {
    this.dialog.open(CreateCustomerDialog).afterClosed().subscribe(success => {
      if (success) {
        this.alertService.showAlert('success', 'Klijent uspiješno kreiran.');
        this.customerService.readMany().then(res => {
          this.customers = res.result!;
        });
      }
      else {
        this.alertService.showAlert('fail', 'Kreiranje nije uspijelo.');
      }
    });
  }

  async update(customer: ICustomerModel): Promise<void> {
    this.dialog.open(UpdateCustomerDialog, {data: customer}).afterClosed().subscribe(success => {
      if (success) {
        this.alertService.showAlert('success', 'Klijent uspiješno ažuriran.');
        this.customerService.readMany().then(res => {
          this.customers = res.result!;
        });
      }
      else {
        this.alertService.showAlert('fail', 'Ažuriranje nije uspijelo.');
      }
    });
  }

  async delete(ref: DocumentReference, index: number): Promise<void> {
    let conf: MatDialogConfig<ConfrimDialogModel> = new MatDialogConfig();
    conf.data = new ConfrimDialogModel('Obriši Klijenta', async () => {
      let res = await this.customerService.delete(ref);
      if (res.success) {
        this.customers.splice(index, 1);
        this.alertService.showAlert('success', 'Klijent uspiješno obrisan.');
      }
      else {
        this.alertService.showAlert('fail', 'Brisanje nije uspijelo.');
      }
    });
    this.dialog.open(ConfirmDialog, conf);
  }

  async redirect(customer: ICustomerModel) {
    this.router.navigate(['customer', customer.ref!.id], {relativeTo: this.route});
  }

  calculateAge(yearOfBirth: any) {
    return (new Date().getFullYear() - parseInt(yearOfBirth));
  }

  async ngOnInit(): Promise<void> {
    this.customers = (await this.customerService.readMany()).result!;
  }
}
