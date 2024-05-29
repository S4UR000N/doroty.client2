import { DocumentReference } from "firebase/firestore";

interface IGroupModel {
    ref?: DocumentReference;
    name: string;
}

export default  IGroupModel;