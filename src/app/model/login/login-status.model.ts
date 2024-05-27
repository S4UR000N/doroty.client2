import { FirebaseOptions } from "firebase/app";

interface ILoginStatusModel {
    isLoggedIn: boolean;
    token?: FirebaseOptions;
}

export default ILoginStatusModel;