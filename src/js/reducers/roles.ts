import {actionTypes} from "../actions/roles";
import {PlainObject} from "../types/interfaces/PlainObject";
import {RECEIVE_USER_SIGNOUT} from "../actions/auth";

type profilesTypes = {
    userRolesList: Array<PlainObject>,
}

const initialState = {
    userRolesList: new Array(),
};


export const roles = (state = initialState, action: PlainObject) => {
    switch (action.type) {
        case actionTypes.GET_ROLES_LIST:
            return {
                ...state,
                userRolesList: action.payload
            };
        case RECEIVE_USER_SIGNOUT:
            return {
                ...state,
                userRolesList: new Array()
            }
        default:
            return state
    }
};