import {actionTypes} from "../actions/users";
import {PlainObject} from "../types/interfaces/PlainObject";

type usersTypes = {
    usersList: Array<PlainObject>,
    userListLoaded: boolean
}

const initialState = {
    usersList: new Array(),
    userListLoaded: false
};

export const users = (state = initialState, action: PlainObject) => {
    switch (action.type) {
        case actionTypes.REQUEST_USERS_LIST:
            return {
                ...state,
                currentUserLoaded: action.payload
            };
        case actionTypes.GET_USERS_LIST:
            return {
                ...state,
                usersList: action.payload,
            };
        default:
            return state
    }
};