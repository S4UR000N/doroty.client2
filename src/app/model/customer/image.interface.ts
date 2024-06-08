import { StorageReference } from "firebase/storage";

interface IImageModel {
    ref?: StorageReference;
    name: string;
    url: string;
}

export default IImageModel;