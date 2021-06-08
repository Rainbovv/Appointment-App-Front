import {authActionTypes} from "../actions/auth";
import {PlainObject} from "../types/interfaces/PlainObject";
import {appointmentsActionType} from "../actions/appointments";

const initialState = {
    patientAppointments: {},
    doctorAppointments: {}
};

export const appointments = (state = initialState, action: PlainObject) => {
    switch (action.type) {

        case appointmentsActionType.RECEIVE_PATIENT_APPOINTMENTS:
            return {
                ...state,
                patientAppointments: action.payload
            }

        case appointmentsActionType.RECEIVE_DOCTOR_APPOINTMENTS:
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