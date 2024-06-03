import { DocumentReference } from "firebase/firestore";
import { FirebaseConnectorService } from "./firebase-connector.service";
import { getStorage, ref, listAll, StorageReference, getDownloadURL, uploadBytes } from "firebase/storage";
import BaseStorageRepository from "./base-storage.repository";
import IResponseModel from "../model/associated/response/response.interface";
import { NanoIdService } from "../service/nano-id.service";


class GenericStorageRepository<T extends { ref?: StorageReference, name: string, url: string }> extends BaseStorageRepository {
    private storageReference?: StorageReference;

    constructor(private firebaseConnectorService: FirebaseConnectorService, private nanoIdService: NanoIdService) {
        super(firebaseConnectorService);
    }

    async create(file: File): Promise<IResponseModel<any>> {
        try {
            await uploadBytes(ref(this.storageReference!, this.nanoIdService.newGUID()), file);
            return ({
                success: true
            });
        }
        catch (err) {
            return ({
                errors: [(err as Error).message],
                success: false
            });
        }
    }
    async readMany(): Promise<IResponseModel<any>> {
        try {
            return ({
                result: (await (await listAll(this.storageReference!)).items.reduce(async (asyncAcc, obj) => ((await asyncAcc).push({ref: obj, url: await getDownloadURL(obj)} as T), asyncAcc), Promise.resolve([] as T[]))),
                success: true
            });
        }
        catch (err) {
            return ({
                errors: [(err as Error).message],
                success: false
            });
        }
    }

    public Initialize(storagePath?: string): void {
        storagePath ? this.storageReference = ref(this.storage, storagePath) : this.storageReference = ref(this.storage);
    }
    
    public ensureInitialized(): void {
        if (!this.storageReference) {
            throw new Error('Service is not initialized. Call Initialize() first.');
        }
    }
}

export default GenericStorageRepository;