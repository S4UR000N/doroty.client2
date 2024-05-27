import { CollectionReference, QueryDocumentSnapshot, collection, getCountFromServer } from "firebase/firestore";
import { Firestore } from "firebase/firestore/lite";
import { FirebaseStorage } from "firebase/storage";
import { FirebaseConnectorService } from "./firebase-connector.service";

abstract class BaseRepository {
    protected firestore: Firestore;
    protected storage: FirebaseStorage;
    public collectionRef: CollectionReference;

    constructor(collectionName: string, private firebaseConnectorService: FirebaseConnectorService) {
        this.firestore = this.firebaseConnectorService.getFirestoreInstance();
        this.storage = this.firebaseConnectorService.getStorageInstance();
        this.collectionRef = collection(this.firestore, collectionName);
    }
}

export default BaseRepository;