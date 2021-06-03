import {RootState} from "../store";
import {PlainObject} from "../types/interfaces/PlainObject";

interface AppointmentsSelectorTypes extends RootState{
    patientAppointments: Array<PlainObject>;
    doctorAppointments: Array<PlainObject>;
}

export const patientAppointments = (state: AppointmentsSelectorTypes) => state.appointments.patientAppointments;
export const doctorAppointments = (state: AppointmentsSelectorTypes) => state.appointments.doctorAppointments;
