import {GET_SPECIALITIES_LIST, REQUEST_SPECIALITIES_LIST} from "../actions/specialities";
import {RECEIVE_USER_SIGNOUT} from "../actions/auth";


const initialState = {
    specialities : [],
    specialitiesLoaded: false,
};

export const specialities = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_SPECIALITIES_LIST:
            return {
                ...state,
                specialitiesLoaded: action.payload
            };
        case GET_SPECIALITIES_LIST:
            return {
                ...state,
                specialities: action.payload,
            };
        case RECEIVE_USER_SIGNOUT:
            return {
                ...state,
                specialities: [],
                specialitiesLoaded: false
            }
        default:
            return state
    }
}