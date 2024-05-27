import { DocumentReference } from "firebase/firestore";

interface ICustomerModel {
    id?: DocumentReference;
    name: string;
    age: number;
    gender: number;
    phone: number;
    address: string;
    description: string;
    alergies: string;
    status: number;
}

export default ICustomerModel;