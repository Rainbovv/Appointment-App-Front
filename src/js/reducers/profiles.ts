import {actionTypes} from "../actions/profiles";
import {PlainObject} from "../types/interfaces/PlainObject";

type profilesTypes = {
    profilesList: Array<PlainObject>,
    profilesListLoaded: boolean,
    profileContentLoaded: boolean,
    selectedUserProfile: PlainObject
}

const initialState = {
    profilesList: new Array(),
    profilesListLoaded: true,
    profileContentLoaded: true,
    selectedUserProfile: {}
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
        case actionTypes.REQUEST_PROFILE_BY_ID:
            return {
                ...state,
                profileContentLoaded: action.payload
            };
        case actionTypes.GET_PROFILE_BY_ID:
            return {
                ...state,
                selectedUserProfile: action.payload,
            };
        case actionTypes.REQUEST_PROFILE_BY_LOGIN:
            return {
                ...state,
                profileContentLoaded: action.payload
            };
        case actionTypes.GET_PROFILE_BY_LOGIN:
            return {
                ...state,
                selectedUserProfile: action.payload,
            };
        case actionTypes.RECEIVE_USER_SIGNOUT:

            return {
                ...state,
                selectedUserProfile: {}
            }
        default:
            return state
    }
};