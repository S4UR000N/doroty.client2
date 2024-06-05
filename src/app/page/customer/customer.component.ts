import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import IGroupModel from '../../model/customer/group.interface';
import { GroupSubService } from '../../service/group-sub.service';
import { CreateGroupDialog } from '../../dialog/group/create-group/create-group.dialog';
import { AlertService } from '../../service/alert.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateGroupDialog } from '../../dialog/group/update-group/update-group.dialog';
import { DocumentReference } from 'firebase/firestore';
import ConfrimDialogModel from '../../model/dialog/confirm-dialog.model';
import { ConfirmDialog } from '../../dialog/associated/confirm/confirm.dialog';
import { CustomerFragmentComponent } from '../../component/customer-fragment/customer-fragment.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CustomerFragmentComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {
  public path: string;
  public groups: IGroupModel[] = [];

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupSubService: GroupSubService,
    private alertService: AlertService,
    public dialog: MatDialog
  ) {
    this.path = `customer/${this.route.snapshot.params['customerId']}/group`;
  }

  async create(): Promise<void> {
    this.dialog.open(CreateGroupDialog, {data: {path: this.path}}).afterClosed().subscribe(success => {
      if (success) {
        this.alertService.showAlert('success', 'Grupa uspiješno kreirana.');
        this.groupSubService.readMany().then(res => {
          this.groups = res.result!;
        });
      }
      else {
        this.alertService.showAlert('fail', 'Kreiranje nije uspijelo.');
      }
    });
  }

  async update(group: IGroupModel): Promise<void> {
    this.dialog.open(UpdateGroupDialog, {data: {groupModel: group, path: this.path}}).afterClosed().subscribe(success => {
      if (success) {
        this.alertService.showAlert('success', 'Grupa uspiješno ažurirana.');
        this.groupSubService.readMany().then(res => {
          this.groups = res.result!;
        });
      }
      else {
        this.alertService.showAlert('fail', 'Ažuriranje nije uspijelo.');
      }
    });
  }

  async delete(ref: DocumentReference, index: number): Promise<void> {
    let conf: MatDialogConfig<ConfrimDialogModel> = new MatDialogConfig();
    conf.data = new ConfrimDialogModel('Obriši Grupu', async () => {
      let res = await this.groupSubService.delete(ref);
      if (res.success) {
        this.groups.splice(index, 1);
        this.alertService.showAlert('success', 'Grupa uspiješno obrisana.');
      }
      else {
        this.alertService.showAlert('fail', 'Brisanje nije uspijelo.');
      }
    });
    this.dialog.open(ConfirmDialog, conf);
  }

  async redirect(group: IGroupModel) {
    this.router.navigate(['group', group.ref!.id], {relativeTo: this.route});
  }

  async ngOnInit(): Promise<void> {
    this.groupSubService.Initialize(this.path)
    this.groups = (await this.groupSubService.readMany()).result!;
  }
}
