import {departmentsActionTypes} from "../actions/departments";
import {authActionTypes} from "../actions/auth";
import {PlainObject} from "../types/interfaces/PlainObject";

export interface DepartmentsState {
    departments : Array<PlainObject>,
    departmentsLoaded: boolean,
}

const initialState: DepartmentsState = {
    departments : [],
    departmentsLoaded: false,
};

export const departments = (state = initialState, action: PlainObject): DepartmentsState => {
    switch (action.type) {
        case departmentsActionTypes.REQUEST_DEPARTMENTS_LIST:
            return {
                ...state,
                departmentsLoaded: action.payload
            };
        case departmentsActionTypes.GET_DEPARTMENTS_LIST:
            return {
                ...state,
                departments: action.payload,
            };
        case authActionTypes.RECEIVE_USER_SIGNOUT:
            return {
                ...state,
                departments: [],
                departmentsLoaded: false
            };
        default:
            return state
    }
}