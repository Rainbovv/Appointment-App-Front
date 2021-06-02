import {RECEIVE_USER_APPOINTMENTS} from "../actions/appointments";


const initialState = {
    appointments: null
};

export const appointments = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_USER_APPOINTMENTS:

            return {
                ...state,
                appointments: action.payload
            }
        default:
            return state
    }
}