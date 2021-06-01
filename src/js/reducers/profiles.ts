import {actionTypes} from "../actions/profiles";
import {PlainObject} from "../types/interfaces/PlainObject";

type profilesTypes = {
    profilesList: Array<PlainObject>,
    profilesListLoaded: boolean
}

const initialState = {
    profilesList: new Array(),
    profilesListLoaded: true
};

export const profiles = (state = initialState, action: PlainObject) => {
    switch (action.type) {
        case actionTypes.REQUEST_PROFILES_LIST:
            return {
                ...state,
                profilesListLoaded: action.payload
            };
        case actionTypes.GET_PROFILES_LIST:
            return {
                ...state,
                profilesList: action.payload,
            };
        default:
            return state
    }
};