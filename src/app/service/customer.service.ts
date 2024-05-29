import { Injectable } from '@angular/core';
import { FirebaseConnectorService } from '../repository/firebase-connector.service';
import GenericCollectionRepository from '../repository/generic-collection.repository';
import ICustomerModel from '../model/customer/customer.interface';
import { DocumentReference } from 'firebase/firestore';
import IResponseModel from '../model/associated/response/response.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  protected customerCollectionRepository: GenericCollectionRepository<ICustomerModel>;

  constructor(private _firebaseConnectorService: FirebaseConnectorService) {
    this.customerCollectionRepository = new GenericCollectionRepository<ICustomerModel>('customer', this._firebaseConnectorService);
  }

  public create = async (entity: ICustomerModel) => await this.customerCollectionRepository.create(entity);
  public readMany = async () => await this.customerCollectionRepository.readMany();
  public update = async (entity: ICustomerModel) => await this.customerCollectionRepository.update(entity);
  public delete = async (ref: DocumentReference) => await this.customerCollectionRepository.delete(ref);
}
