import { Injectable } from '@angular/core';
import { FirebaseConnectorService } from '../repository/firebase-connector.service';
import GenericCollectionRepository from '../repository/generic-collection.repository';
import ICustomerModel from '../model/customer/customer.interface';
import { DocumentReference, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerCollectionRepository: GenericCollectionRepository<ICustomerModel>;

  constructor(private _firebaseConnectorService: FirebaseConnectorService) {
    this.customerCollectionRepository = new GenericCollectionRepository<ICustomerModel>('customer', this._firebaseConnectorService);
  }

  public create = async (entity: ICustomerModel) => await this.customerCollectionRepository.create(entity);
  public readOneById = async (id: string) => await this.customerCollectionRepository.readOne(await this.customerCollectionRepository.createRef(id));
  public readQuery = async (customerName: string) => await this.customerCollectionRepository.readQuery(where("name", "==", customerName));
  public readMany = async () => await this.customerCollectionRepository.readMany();
  public update = async (entity: ICustomerModel) => await this.customerCollectionRepository.update(entity);
  public delete = async (ref: DocumentReference) => await this.customerCollectionRepository.delete(ref);
}
