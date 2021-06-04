import {actionTypes} from "../actions/profiles";
import {PlainObject} from "../types/interfaces/PlainObject";

type profilesTypes = {
    patientProfilesList: Array<PlainObject>,
    personalProfilesList: Array<PlainObject>,
    profilesList: Array<PlainObject>,
    profilesListLoaded: boolean,
    profileContentLoaded: boolean,
    selectedUserProfile: PlainObject
}

const initialState = {
    patientProfilesList: new Array(),
    personalProfilesList: new Array(),
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
        case actionTypes.GET_PATIENT_PROFILES_LIST:
            return {
                ...state,
                patientProfilesList: action.payload,
            };
        case actionTypes.GET_PERSONAL_PROFILES_LIST:
            return {
                ...state,
                personalProfilesList: action.payload,
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
                profilesList: new Array(),
                profilesListLoaded: false,
                profileContentLoaded: false,
                selectedUserProfile: {}
            }
        default:
            return state
    }
};