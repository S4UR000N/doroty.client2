import { DocumentReference, addDoc, collection, doc } from "firebase/firestore";
import BaseRepository from "./base.repository";
import { FirebaseConnectorService } from "./firebase-connector.service";
import IResponseModel from "../model/associated/response/response.interface";

class GenericCollectionRepository<T extends { id?: DocumentReference }> extends BaseRepository {
    constructor(private collectionName: string, private _firebaseConnectorService: FirebaseConnectorService) {
        super(collectionName, _firebaseConnectorService);
    }

    async create(entity: T, path: string = ''): Promise<IResponseModel<T>> {
        try {
            let ref = path ? collection(this.collectionRef, path) : this.collectionRef;
            !entity.id && delete entity.id;
            entity.id = await addDoc(ref, entity);
            let res: IResponseModel<T> = {
                result: entity,
                success: true
            };
            return res;
        }
        catch (err) {
            let res: IResponseModel<T> = {
                errors: [(err as Error).message],
                success: false
            };
            return res;
        }
    }
}

export default GenericCollectionRepository;