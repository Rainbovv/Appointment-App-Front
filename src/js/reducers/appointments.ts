import {appointmentsActionTypes} from "../actions/appointments";
import {authActionTypes} from "../actions/auth";
import { PlainObject } from "../types/interfaces/PlainObject";

type profilesTypes = {
    patientAppointments: [],
    doctorAppointments: []
}

const initialState = {
    patientAppointments: new Array(),
    doctorAppointments: new Array()
};


export const appointments = (state = initialState, action: PlainObject) => {
    switch (action.type) {
        case appointmentsActionTypes.RECEIVE_PATIENT_APPOINTMENTS:

            return {
                ...state,
                patientAppointments: action.payload
            }
        case appointmentsActionTypes.RECEIVE_DOCTOR_APPOINTMENTS:

            return {
                ...state,
                doctorAppointments: action.payload
            }

        case authActionTypes.RECEIVE_USER_SIGNOUT:

            return {
                ...state,
                patientAppointments: [],
                doctorAppointments: []
            }
        default:
            return state
    }
}