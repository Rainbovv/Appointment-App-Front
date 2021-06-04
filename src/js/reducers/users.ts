import {actionTypes} from "../actions/users";
import {PlainObject} from "../types/interfaces/PlainObject";

type profilesTypes = {
}

const initialState = {
};


export const users = (state = initialState, action: PlainObject) => {
    switch (action.type) {
        case actionTypes.CREATE_USER:
            return {
                ...state,
            };
        default:
            return state
    }
};