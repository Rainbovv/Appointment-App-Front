import {HttpService} from "../services/HttpService";
import {routes} from "../config/routes";
import { Dispatch } from "redux";

export enum appointmentsActionTypes  {
    RECEIVE_PATIENT_APPOINTMENTS = "RECEIVE_PATIENT_APPOINTMENTS",
    RECEIVE_DOCTOR_APPOINTMENTS = "RECEIVE_DOCTOR_APPOINTMENTS"
}


export const getPatientAppointments = (id: number) => (dispatch: Dispatch) => {
    const URL = routes.BASIC_URL + routes.BASIC_PATH + routes.APPOINTMENTS_URL + "/patient/" + id

    return HttpService.get(URL, {})
        .then(response => {
            return dispatch({
                type: appointmentsActionTypes.RECEIVE_PATIENT_APPOINTMENTS,
                payload: response
            })
        })
}
export const getDoctorAppointments = (id: number) => (dispatch: Dispatch) => {
    const URL = routes.BASIC_URL + routes.BASIC_PATH + routes.APPOINTMENTS_URL + "/doctor/" + id

    return HttpService.get(URL, {})
        .then(response => {
            return dispatch({
                type: appointmentsActionTypes.RECEIVE_DOCTOR_APPOINTMENTS,
                payload: response
            })
        })
}
