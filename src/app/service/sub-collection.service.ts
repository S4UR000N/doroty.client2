import { DocumentReference } from "firebase/firestore";
import { FirebaseConnectorService } from "../repository/firebase-connector.service";
import GenericCollectionRepository from "../repository/generic-collection.repository";
import ISubCollection from "../repository/sub-collection.interface";

abstract class SubCollection<T extends { ref?: DocumentReference }> implements ISubCollection {
    protected subCollectionRepository?: GenericCollectionRepository<T>;

    constructor(private _firebaseConnectorService: FirebaseConnectorService) {}

    public Initialize(_collectionPath: string): void {
        console.log(_collectionPath);
        
        this.subCollectionRepository = new GenericCollectionRepository<T>(_collectionPath, this._firebaseConnectorService);
    }
    
    protected ensureInitialized(): void {
        if (!this.subCollectionRepository) {
            throw new Error('Service is not initialized. Call Initialize() first.');
        }
    }
}

export default SubCollection;