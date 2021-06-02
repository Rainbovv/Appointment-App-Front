import {RootState} from "../store";
import {PlainObject} from "../types/interfaces/PlainObject";

interface AppointmentsSelectorTypes extends RootState{
    appointmentsList: Array<PlainObject>;
}

export const userAppointments = (state: AppointmentsSelectorTypes) => state.appointments.appointmentsList;