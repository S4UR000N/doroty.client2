import { DocumentReference } from "firebase/firestore";

interface IImageModel {
    ref?: DocumentReference;
    name: string;
    url: string;
}

export default IImageModel;