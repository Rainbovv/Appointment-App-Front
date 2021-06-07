import {usersActionTypes} from "../actions/users";
import {PlainObject} from "../types/interfaces/PlainObject";

type profilesTypes = {
}

const initialState = {
};


export const users = (state = initialState, action: PlainObject) => {
    switch (action.type) {
        case usersActionTypes.CREATE_USER:
            return {
                ...state,
            };
        default:
            return state
    }
};