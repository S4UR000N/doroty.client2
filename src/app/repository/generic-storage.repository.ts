import { DocumentReference } from "firebase/firestore";
import BaseRepository from "./base.repository";
import { FirebaseConnectorService } from "./firebase-connector.service";

class GenericStorageRepository<T extends { ref?: DocumentReference }> extends BaseRepository {
    constructor(private collectionPath: string, private firebaseConnectorService: FirebaseConnectorService) {
        super(collectionPath, firebaseConnectorService);
    }
}