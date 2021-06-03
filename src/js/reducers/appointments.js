import {RECEIVE_DOCTOR_APPOINTMENTS, RECEIVE_PATIENT_APPOINTMENTS} from "../actions/appointments";
import {RECEIVE_USER_SIGNOUT} from "../actions/auth";


const initialState = {
    patientAppointments: [],
    doctorAppointments: []
};

export const appointments = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_PATIENT_APPOINTMENTS:

            return {
                ...state,
                patientAppointments: action.payload
            }
        case RECEIVE_DOCTOR_APPOINTMENTS:

            return {
                ...state,
                doctorAppointments: action.payload
            }

        case RECEIVE_USER_SIGNOUT:

            return {
                ...state,
                patientAppointments: [],
                doctorAppointments: []
            }
        default:
            return state
    }
}