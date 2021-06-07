import {rolesActionTypes} from "../actions/roles";
import {PlainObject} from "../types/interfaces/PlainObject";

type profilesTypes = {
    userRolesList: Array<PlainObject>,
}

const initialState = {
    userRolesList: new Array(),
};


export const roles = (state = initialState, action: PlainObject) => {
    switch (action.type) {
        case rolesActionTypes.GET_ROLES_LIST:
            return {
                ...state,
                userRolesList: action.payload
            };
        default:
            return state
    }
};