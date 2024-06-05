import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import ICustomerModel from '../../model/customer/customer.interface';
import { ActivatedRoute } from '@angular/router';

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
  public constructor(private route: ActivatedRoute, private customerService: CustomerService) {}

  calculateAge(yearOfBirth: any) {
    return (new Date().getFullYear() - parseInt(yearOfBirth));
  }

  async ngOnInit(): Promise<void> {
    this.customer = (await this.customerService.readOneById(this.route.snapshot.params['customerId'])).result!;

  }
}