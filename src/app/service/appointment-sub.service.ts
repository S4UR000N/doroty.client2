import { DocumentReference } from 'firebase/firestore';
import { FirebaseConnectorService } from '../repository/firebase-connector.service';
import { Injectable } from '@angular/core';
import IResponseModel from '../model/associated/response/response.interface';
import SubCollection from './sub-collection.service';
import IAppointmentModel from '../model/customer/appointment.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentSubService extends SubCollection<IAppointmentModel> {
  constructor(private firebaseConnectorService: FirebaseConnectorService) {
    super(firebaseConnectorService);
  }

  public async create(entity: IAppointmentModel): Promise<IResponseModel<IAppointmentModel>> {
    this.ensureInitialized();
    return await this.subCollectionRepository!.create(entity);
  }
  public async readMany(): Promise<IResponseModel<IAppointmentModel[]>> {
    this.ensureInitialized();
    return await this.subCollectionRepository!.readMany();
  }
  public async update(entity: IAppointmentModel): Promise<IResponseModel<IAppointmentModel>> {
    this.ensureInitialized();
    return await this.subCollectionRepository!.update(entity);
  }
  public async delete(ref: DocumentReference): Promise<IResponseModel<IAppointmentModel>> {
    this.ensureInitialized();
    return await this.subCollectionRepository!.delete(ref);
  }
}
