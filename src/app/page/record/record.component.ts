import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import ICustomerModel from '../../model/customer/customer.interface';
import { CustomerService } from '../../service/customer.service';
import { CreateCustomerDialog } from '../../dialog/create-customer/create-customer.dialog';

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
    private customerService: CustomerService,
    public dialog: MatDialog
  ) {}

  async openCreateDialog(): Promise<void> {
    this.dialog.open(CreateCustomerDialog);
  }

  async ngOnInit(): Promise<void> {
    this.customers = (await this.customerService.readMany()).result!;
  }
}
