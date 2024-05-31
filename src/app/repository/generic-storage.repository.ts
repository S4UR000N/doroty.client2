import { DocumentReference } from "firebase/firestore";
import { FirebaseConnectorService } from "./firebase-connector.service";
import { getStorage, ref, listAll } from "firebase/storage";
import BaseStorageRepository from "./base-storage.repository";


class GenericStorageRepository<T extends { ref?: DocumentReference }> extends BaseStorageRepository {
    constructor(private firebaseConnectorService: FirebaseConnectorService) {
        super(firebaseConnectorService);
        // const storage = getStorage(this);
        const listRef = ref(this.storage, '2FoW1XFhETd4yc6uznpgwo/2FNNa3LkdZJjdBugPtRUrE');
        console.log(listRef);
        console.log("GenericStorageRepository");
        // Find all the prefixes and items.
        listAll(listRef)
        .then((res) => {
            console.log("REFFSS");
            res.prefixes.forEach((folderRef) => {
            // All the prefixes under listRef.
            // You may call listAll() recursively on them.
            console.log("PREFIXESS");
            
                console.log(folderRef);
                
            });
            res.items.forEach((itemRef) => {
                console.log("ITEM REF");
                
            // All the items under listRef.
                console.log(itemRef);
            });
        }).catch((error) => {
            console.log(error);
            
        });
    }
}

export default GenericStorageRepository;