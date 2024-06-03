import { Injectable } from '@angular/core';
import { FirebaseConnectorService } from '../repository/firebase-connector.service';
import GenericStorageRepository from '../repository/generic-storage.repository';
import IResponseModel from '../model/associated/response/response.interface';
import IImageModel from '../model/customer/image.interface';
import { NanoIdService } from './nano-id.service';

@Injectable({
  providedIn: 'root'
})
export class ObjectStorageService {
  private genericStorageRepository: GenericStorageRepository<any>;

  constructor(private firebaseConnectorService: FirebaseConnectorService, private nanoIdService: NanoIdService) {
    this.genericStorageRepository = new GenericStorageRepository<any>(this.firebaseConnectorService, this.nanoIdService);
  }

  public async create(file: File): Promise<IResponseModel<any>> {
    this.genericStorageRepository.ensureInitialized();
    return await this.genericStorageRepository!.create(file);
  }
  public async readMany(): Promise<IResponseModel<IImageModel[]>> {
    this.genericStorageRepository.ensureInitialized();
    return await this.genericStorageRepository!.readMany();
  }
  // public async update(entity: T): Promise<IResponseModel<T>> {
  //   this.genericStorageRepository.ensureInitialized();
  //   return await this.genericStorageRepository!.update(entity);
  // }
  // public async delete(ref: DocumentReference): Promise<IResponseModel<T>> {
  //   this.genericStorageRepository.ensureInitialized();
  //   return await this.genericStorageRepository!.delete(ref);
  // }

  public Initialize(storagePath?: string): void {
    this.genericStorageRepository.Initialize(storagePath);
  }
}
