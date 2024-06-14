import { DocumentReference } from "firebase/firestore";
import IGroupModel from "./group.interface";

interface ICustomerModel {
    ref?: DocumentReference;
    name: string;
    age: number;
    gender: number;
    phone: string;
    address: string;
    description: string;
    alergies: string;
    status: number;
    diabetes: number;
    groups?: IGroupModel[];
}

export default ICustomerModel;