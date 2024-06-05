import { DocumentReference } from "firebase/firestore";

interface IAppointmentModel {
    ref?: DocumentReference;
    name: string,
    description: string,
    date: Date | string
    medicine: string;
}

export default IAppointmentModel;