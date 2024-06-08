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
import { CustomerFragmentComponent } from '../../component/customer-fragment/customer-fragment.component';
import { BackComponent } from '../../component/back/back.component';
import moment from 'moment';
import { AngularMaterialFormModule } from '../../module/angular-material-form.module';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CustomerFragmentComponent, BackComponent, AngularMaterialFormModule],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent implements OnInit {
  public path: string;
  public storagePath: string;
  public appointments: IAppointmentModel[] = [];
  public images: IImageModel[] = [];
  public imageIndex: number = 0;
  public dateSort: number = 1;

  public constructor(
    private route: ActivatedRoute,
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
          this.sortByDate();
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
          this.sortByDate();
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

  async deleteImage() {
    console.log("DELETE IMAGE");
    console.log(this.imageIndex);
    let conf: MatDialogConfig<ConfrimDialogModel> = new MatDialogConfig();
    conf.data = new ConfrimDialogModel('Obriši Sliku', async () => {
      let res = await this.objectStorageService.delete(this.images[this.imageIndex].ref!);
      if (res.success) {
        console.log(this.imageIndex);
        this.images.splice(this.imageIndex, 1);
        this.alertService.showAlert('success', 'Slika uspiješno obrisana.');
      }
      else {
        this.alertService.showAlert('fail', 'Brisanje nije uspijelo.');
      }
    });
    this.dialog.open(ConfirmDialog, conf);
  }

  asDate(date: any): Date | string {
    if (date) {
      if (date.seconds) {
        return moment.unix(date.seconds).format('DD/MM/YYYY');
      }
      else if (typeof date.getFullYear == 'function') {
        return moment(date).format('DD/MM/YYYY')
      }
    }
    return '';
  }

  asDateObject(date: any) {
    if (date) {
      if (date.seconds) {
        return moment.unix(date.seconds).toDate();
      }
      else if (typeof date.getFullYear == 'function') {
        return date;
      }
    }
    return '';
  }

  sortNewToOld(a: any, b: any) {
    const dateA = this.asDateObject(a.date);
    const dateB = this.asDateObject(b.date);

    if (dateA === '' && dateB === '') return 0;
    if (dateA === '') return 1;
    if (dateB === '') return -1;

    return (dateB as Date).getTime() - (dateA as Date).getTime();
  }

  sortOldToNew(a: any, b: any) {
    const dateA = this.asDateObject(a.date);
    const dateB = this.asDateObject(b.date);

    if (dateA === '' && dateB === '') return 0;
    if (dateA === '') return 1;
    if (dateB === '') return -1;

    return (dateA as Date).getTime() - (dateB as Date).getTime();
  }

  sortByDate() {
    if (this.dateSort) {
      this.appointments.sort((a, b) => this.sortNewToOld(a, b));
    }
    else {
      this.appointments.sort((a, b) => this.sortOldToNew(a, b));
    }
  }

  setImageIndex(index: number) {
    this.imageIndex = index;
  }
  incrementImageIndex() {
    this.imageIndex++;
  }
  decrementImageIndex() {
    this.imageIndex--;
  }
  print(x: any) {
    console.log(x);
  }

  async ngOnInit(): Promise<void> {
    this.appointmentSubService.Initialize(this.path);
    this.objectStorageService.Initialize(this.storagePath);
    this.appointments = (await this.appointmentSubService.readMany()).result!.sort((a, b) => this.sortNewToOld(a, b));
    this.images = (await this.objectStorageService.readMany()).result!;
  }
}
