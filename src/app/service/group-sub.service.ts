import { DocumentReference } from 'firebase/firestore';
import { CustomerService } from './customer.service';
import IGroupModel from '../model/customer/group.interface';
import GenericCollectionRepository from '../repository/generic-collection.repository';
import { FirebaseConnectorService } from '../repository/firebase-connector.service';
import ICustomerModel from '../model/customer/customer.interface';
import { Injectable } from '@angular/core';
import IResponseModel from '../model/associated/response/response.interface';
import ISubCollection from '../repository/sub-collection.interface';
import SubCollection from './sub-collection.service';

@Injectable({
  providedIn: 'root'
})
export class GroupSubService extends SubCollection<IGroupModel> {
  constructor(private firebaseConnectorService: FirebaseConnectorService) {
    super(firebaseConnectorService);
  }

  public async create(entity: IGroupModel): Promise<IResponseModel<IGroupModel>> {
    this.ensureInitialized();
    return await this.subCollectionRepository!.create(entity);
  }
  public async readMany(): Promise<IResponseModel<IGroupModel[]>> {
    this.ensureInitialized();
    return await this.subCollectionRepository!.readMany();
  }
  public async update(entity: IGroupModel): Promise<IResponseModel<IGroupModel>> {
    this.ensureInitialized();
    return await this.subCollectionRepository!.update(entity);
  }
  public async delete(ref: DocumentReference): Promise<IResponseModel<IGroupModel>> {
    this.ensureInitialized();
    return await this.subCollectionRepository!.delete(ref);
  }
}
