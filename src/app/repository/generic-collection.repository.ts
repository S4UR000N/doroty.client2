import { DocumentReference, DocumentSnapshot, addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import BaseRepository from "./base.repository";
import { FirebaseConnectorService } from "./firebase-connector.service";
import IResponseModel from "../model/associated/response/response.interface";

class GenericCollectionRepository<T extends { ref?: DocumentReference }> extends BaseRepository {
    constructor(private collectionPath: string, private firebaseConnectorService: FirebaseConnectorService) {
        super(collectionPath, firebaseConnectorService);
    }

    async create(entity: T): Promise<IResponseModel<T>> {
        try {
            // let ref = path ? collection(this.collectionRef, path) : this.collectionRef;
            !entity.ref && delete entity.ref;
            entity.ref = await addDoc(this.collectionRef, entity);
            return ({
                result: entity,
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
    async createSub<S extends T>(entity: S, path: string): Promise<IResponseModel<S>> {
        try {
            !entity.ref && delete entity.ref;
            entity.ref = await addDoc(collection(this.collectionRef, path), entity);
            return ({
                result: entity,
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
    async readOne(ref: DocumentReference): Promise<IResponseModel<T>> {
        try {
            return ({
                result: (await this.mapDoc(await getDoc(ref) as DocumentSnapshot<T>)),
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
    async readOneSub<S extends T>(ref: DocumentReference): Promise<IResponseModel<S>> {
        return (await this.readOne(ref) as IResponseModel<S>);
    }
    async readMany(): Promise<IResponseModel<T[]>> {
        try {
            return ({
                result: (await getDocs(this.collectionRef)).docs.reduce((acc, obj) => (acc.push({...(obj.data() as T), ref: obj.ref}), acc), [] as T[]),
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
    async readManySub<S extends T>(path: string): Promise<IResponseModel<S[]>> {
        try {
            return ({
                result: (await getDocs(collection(this.collectionRef, path))).docs.reduce((acc, obj) => (acc.push({...(obj.data() as S), ref: obj.ref}), acc), [] as S[]),
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
    async update(entity: T): Promise<IResponseModel<T>> {
        try {
            console.log(entity.ref!);
            await updateDoc(entity.ref!, entity);
            return ({
                success: true
            });
        }
        catch (err) {
            console.log(err);
            return ({
                errors: [(err as Error).message],
                success: false
            });
        }
    }
    async delete(ref: DocumentReference): Promise<IResponseModel<T>> {
        try {
            await deleteDoc(doc(this.collectionRef, ref.id));
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
    mapDoc = async (document: DocumentSnapshot<T>) => ({ref: document.ref, ...document.data()} as T);
}

export default GenericCollectionRepository;