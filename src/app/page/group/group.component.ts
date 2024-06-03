import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../service/alert.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DocumentReference } from 'firebase/firestore';
import ConfrimDialogModel from '../../model/dialog/confirm-dialog.model';
import { ConfirmDialog } from '../../dialog/associated/confirm/confirm.dialog';
import { AppointmentSubService } from '../../service/appointment-sub.service';
import IAppointmentModel from '../../model/customer/appointment.interface';
import { CreateAppointmentDialog } from '../../dialog/appointment/create-appointment/create-appointment.dialog';
import { UpdateAppointmentDialog } from '../../dialog/appointment/update-appointment/update-appointment.dialog';
import { ObjectStorageService } from '../../service/object-storage.service';
import IImageModel from '../../model/customer/image.interface';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent implements OnInit {
  public path: string;
  public storagePath: string;
  public appointments: IAppointmentModel[] = [];
  public images: IImageModel[] = [];

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentSubService: AppointmentSubService,
    private objectStorageService: ObjectStorageService,
    private alertService: AlertService,
    public dialog: MatDialog
  ) {
    this.path = `customer/${this.route.snapshot.params['customerId']}/group/${this.route.snapshot.params['groupId']}/appointment`;
    this.storagePath = `${this.route.snapshot.params['customerId']}/${this.route.snapshot.params['groupId']}`;
  }

  async create(): Promise<void> {
    this.dialog.open(CreateAppointmentDialog, {data: {path: this.path}}).afterClosed().subscribe(success => {
      if (success) {
        this.alertService.showAlert('success', 'Termin uspiješno kreiran.');
        this.appointmentSubService.readMany().then(res => {
          this.appointments = res.result!;
        });
      }
      else {
        this.alertService.showAlert('fail', 'Kreiranje nije uspijelo.');
      }
    });
  }

  async update(appointment: IAppointmentModel): Promise<void> {
    this.dialog.open(UpdateAppointmentDialog, {data: {appointmentModel: appointment, path: this.path}}).afterClosed().subscribe(success => {
      if (success) {
        this.alertService.showAlert('success', 'Termin uspiješno ažuriran.');
        this.appointmentSubService.readMany().then(res => {
          this.appointments = res.result!;
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
      let res = await this.appointmentSubService.delete(ref);
      if (res.success) {
        this.appointments.splice(index, 1);
        this.alertService.showAlert('success', 'Termin uspiješno obrisan.');
      }
      else {
        this.alertService.showAlert('fail', 'Brisanje nije uspijelo.');
      }
    });
    this.dialog.open(ConfirmDialog, conf);
  }

  async createImage(event: Event): Promise<void> {
    let files = (event.target as HTMLInputElement).files;
    if (!files || files?.length < 1) {
      this.alertService.showAlert('fail', 'Niti jedna slika nije dodana.');
    }
    else if (files?.length! > 5) {
      this.alertService.showAlert('fail', 'Limit je 5 slika odjednom.');
    }
    else {
      let count = 0;
      let failedCount = 0;
      let hasFailed = false;
      for (let i = 0; i < files?.length!; i++) {
        let res = await this.objectStorageService.create(files.item(i)!);
        if (res.success) {
          count++;
        }
        else {
          hasFailed = true;
          failedCount = files?.length! - count; 
          break;
        }
      }

      if (hasFailed) {
        if (count > 0) {
          this.images = (await this.objectStorageService.readMany()).result!;
          this.alertService.showAlert('success', `Slike uspiješno dodane * ${count}.`);
          setTimeout(() => {this.alertService.showAlert('fail', `Slike nisu dodane * ${failedCount}.`)}, 3000);
        }
        else {
          this.alertService.showAlert('fail', 'Niti jedna slika nije dodana.');
        }
      }
      else {
        this.images = (await this.objectStorageService.readMany()).result!;
        this.alertService.showAlert('success', `Slike uspiješno dodane * ${count}.`);
      }
    }
  }

  async ngOnInit(): Promise<void> {
    this.appointmentSubService.Initialize(this.path);
    this.objectStorageService.Initialize(this.storagePath);
    this.appointments = (await this.appointmentSubService.readMany()).result!;
    this.images = (await this.objectStorageService.readMany()).result!;
  }
}
