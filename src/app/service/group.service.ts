import { DocumentReference } from 'firebase/firestore';
import { CustomerService } from './customer.service';

export class GroupService extends CustomerService {
  public isInitialized = false;

  public Initialize(entity: DocumentReference) {
    // this.customerCollectionRepository.collectionRef
  }
}
