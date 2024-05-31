import { FirebaseStorage } from "firebase/storage";
import { FirebaseConnectorService } from "./firebase-connector.service";

abstract class BaseStorageRepository {
    protected storage: FirebaseStorage;

    constructor(private _firebaseConnectorService: FirebaseConnectorService) {
        this.storage = this._firebaseConnectorService.getStorageInstance();
    }
}

export default BaseStorageRepository;