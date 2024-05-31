import { CollectionReference, QueryDocumentSnapshot, collection, getCountFromServer } from "firebase/firestore";
import { Firestore } from "firebase/firestore/lite";
import { FirebaseStorage } from "firebase/storage";
import { FirebaseConnectorService } from "./firebase-connector.service";

abstract class BaseCollectionRepository {
    protected firestore: Firestore;
    protected storage: FirebaseStorage;
    public collectionRef: CollectionReference;

    constructor(private _collectionPath: string, private _firebaseConnectorService: FirebaseConnectorService) {
        this.firestore = this._firebaseConnectorService.getFirestoreInstance();
        this.storage = this._firebaseConnectorService.getStorageInstance();
        this.collectionRef = collection(this.firestore, this._collectionPath);
    }
}

export default BaseCollectionRepository;