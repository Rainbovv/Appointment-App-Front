import {specialitiesActionTypes} from "../actions/specialities";
import {authActionTypes} from "../actions/auth";
import {PlainObject} from "../types/interfaces/PlainObject";

interface SpecialitiesState {
    specialities: Array<PlainObject>,
    specialitiesLoaded: boolean
}

const initialState = {
    specialities : {},
    specialitiesLoaded: false,
};

export const specialities = (state = initialState, action: PlainObject) => {
    switch (action.type) {
        case specialitiesActionTypes.REQUEST_SPECIALITIES_LIST:
            return {
                ...state,
                specialitiesLoaded: action.payload
            };
        case specialitiesActionTypes.GET_SPECIALITIES_LIST:
            return {
                ...state,
                specialities: action.payload,
            };
        case authActionTypes.RECEIVE_USER_SIGNOUT:
            return {
                ...state,
                specialities: [],
                specialitiesLoaded: false
            }
        default:
            return state
    }
}