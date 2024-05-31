import { Injectable } from '@angular/core';
import { FirebaseConnectorService } from '../repository/firebase-connector.service';
import GenericStorageRepository from '../repository/generic-storage.repository';

@Injectable({
  providedIn: 'root'
})
export class ObjectStorageService {
  private genericStorageRepository: GenericStorageRepository<any>;

  constructor(private firebaseConnectorService: FirebaseConnectorService) {
    this.genericStorageRepository = new GenericStorageRepository<any>(this.firebaseConnectorService);
  }
}
