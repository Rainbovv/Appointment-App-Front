import {GET_DEPARTMENTS_LIST, REQUEST_DEPARTMENTS_LIST} from "../actions/departments";
import {RECEIVE_USER_SIGNOUT} from "../actions/auth";

const initialState = {
    departments : [],
    departmentsLoaded: false,
};

export const departments = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_DEPARTMENTS_LIST:
            return {
                ...state,
                departmentsLoaded: action.payload
            };
        case GET_DEPARTMENTS_LIST:
            return {
                ...state,
                departments: action.payload,
            };
        case RECEIVE_USER_SIGNOUT:
            return {
                ...state,
                departments: [],
                departmentsLoaded: false
            };
        default:
            return state
    }
}