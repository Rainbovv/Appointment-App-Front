import {HttpService} from "../services/HttpService";
import {
    BASIC_URL,
    BASIC_PATH,
    APPOINTMENTS_URL
} from "../config/routes";


export const RECEIVE_PATIENT_APPOINTMENTS = "RECEIVE_USER_APPOINTMENTS";
export const RECEIVE_DOCTOR_APPOINTMENTS = "RECEIVE_DOCTOR_APPOINTMENTS";

export const getPatientAppointments = (id) => (dispatch) => {
    const URL = BASIC_URL + BASIC_PATH + APPOINTMENTS_URL + "/patient/" + id

    return HttpService.get(URL, {})
        .then(response => {
            return dispatch({
                type: RECEIVE_PATIENT_APPOINTMENTS,
                payload: response
            })
        })
}
export const getDoctorAppointments = (id) => (dispatch) => {
    const URL = BASIC_URL + BASIC_PATH + APPOINTMENTS_URL + "/doctor/" + id

    return HttpService.get(URL, {})
        .then(response => {
            return dispatch({
                type: RECEIVE_DOCTOR_APPOINTMENTS,
                payload: response
            })
        })
}