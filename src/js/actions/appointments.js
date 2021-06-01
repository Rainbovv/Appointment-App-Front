import {HttpService} from "../services/HttpService";
import {
    BASIC_URL,
    BASIC_PATH,
    APPOINTMENTS_URL
} from "../config/routes";
import {auth} from "../reducers/auth";

export const RECEIVE_USER_APPOINTMENTS = "RECEIVE_USER_APPOINTMENTS";

export const getAppointments = (id) => (dispatch) => {
    const URL = BASIC_URL + BASIC_PATH + APPOINTMENTS_URL + "/user/" + id

    return HttpService.get(URL, {})
        .then(response => {
            return dispatch({
                type: RECEIVE_USER_APPOINTMENTS,
                payload: response
            })
        })
}