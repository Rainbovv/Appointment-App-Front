import {HttpService} from "../services/HttpService.ts";
import {routes} from "../config/routes.ts";

export const RECEIVE_PATIENT_APPOINTMENTS = "RECEIVE_PATIENT_APPOINTMENTS";
export const RECEIVE_DOCTOR_APPOINTMENTS = "RECEIVE_DOCTOR_APPOINTMENTS";

export const getPatientAppointments = (id) => (dispatch) => {
    const URL = routes.BASIC_URL + routes.BASIC_PATH + routes.APPOINTMENTS_URL + "/patient/" + id

    return HttpService.get(URL, {})
        .then(response => {
            return dispatch({
                type: RECEIVE_PATIENT_APPOINTMENTS,
                payload: response
            })
        })
}
export const getDoctorAppointments = (id) => (dispatch) => {
    const URL = routes.BASIC_URL + routes.BASIC_PATH + routes.APPOINTMENTS_URL + "/doctor/" + id

    return HttpService.get(URL, {})
        .then(response => {
            return dispatch({
                type: RECEIVE_DOCTOR_APPOINTMENTS,
                payload: response
            })
        })
}
