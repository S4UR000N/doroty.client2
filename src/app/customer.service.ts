import { Injectable } from '@angular/core';
import { FirebaseConnectorService } from './repository/firebase-connector.service';
import GenericCollectionRepository from './repository/generic-collection.repository';
import ICustomerModel from './model/customer/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerCollectionRepository: GenericCollectionRepository<ICustomerModel>;

  constructor(private _firebaseConnectorService: FirebaseConnectorService) {
    this.customerCollectionRepository = new GenericCollectionRepository<ICustomerModel>('customer', this._firebaseConnectorService);
  }

  public create = async (entity: ICustomerModel) => await this.customerCollectionRepository.create(entity);
}
