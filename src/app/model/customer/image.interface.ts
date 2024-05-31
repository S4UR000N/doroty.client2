import { DocumentReference } from "firebase/firestore";

interface IImageModel {
    ref?: DocumentReference;
    name: string;
}

export default IImageModel;