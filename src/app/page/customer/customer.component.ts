import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';
import IGroupModel from '../../model/customer/group.interface';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {
  public groups: IGroupModel[] = [];

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {}

  async openCreateDialog(): Promise<void> {
    console.log("lol");
  }

  async redirect(group: IGroupModel) {
    this.router.navigate(['group', group.ref!.id], {relativeTo: this.route});
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['id']);
    });
    console.log(this.route);
  }
}
