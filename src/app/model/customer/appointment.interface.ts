import { DocumentReference } from "firebase/firestore";

interface IAppointmentModel {
    ref?: DocumentReference;
    name: string,
    description: string,
    date: Date | string,
    startTime: Date,
    endTime: Date,
    medicine: string;
}

export default IAppointmentModel;