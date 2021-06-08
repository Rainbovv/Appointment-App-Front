import {profileActionTypes} from "../actions/profiles";
import {PlainObject} from "../types/interfaces/PlainObject";
import {authActionTypes} from "../actions/auth";

type profilesTypes = {
    patientProfilesList: Array<PlainObject>,
    personalProfilesList: Array<PlainObject>,
    profilesBySpeciality: Array<PlainObject>,
    profilesList: Array<PlainObject>,
    profilesListLoaded: boolean,
    profileContentLoaded: boolean,
    selectedUserProfile: PlainObject
}

const initialState = {
    patientProfilesList: new Array(),
    personalProfilesList: new Array(),
    profilesList: new Array(),
    profilesBySpeciality: new Array(),
    profilesListLoaded: true,
    profileContentLoaded: true,
    selectedUserProfile: {}
};


export const profiles = (state = initialState, action: PlainObject) => {
    switch (action.type) {

        case profileActionTypes.REQUEST_PROFILES_LIST:
            return {
                ...state,
                profilesListLoaded: action.payload
            };

        case profileActionTypes.GET_PROFILES_LIST:
            return {
                ...state,
                profilesList: action.payload,
            };

        case profileActionTypes.GET_PROFILES_BY_SPECIALITY:
            return {
                ...state,
                profilesBySpeciality: action.payload
            };

        case profileActionTypes.GET_PATIENT_PROFILES_LIST:
            return {
                ...state,
                patientProfilesList: action.payload,
            };

        case profileActionTypes.GET_PERSONAL_PROFILES_LIST:
            return {
                ...state,
                personalProfilesList: action.payload,
            };

        case profileActionTypes.REQUEST_PROFILE_BY_ID:
            return {
                ...state,
                profileContentLoaded: action.payload
            };

        case profileActionTypes.GET_PROFILE_BY_ID:
            return {
                ...state,
                selectedUserProfile: action.payload,
            };

        case profileActionTypes.REQUEST_PROFILE_BY_LOGIN:
            return {
                ...state,
                profileContentLoaded: action.payload
            };

        case profileActionTypes.GET_PROFILE_BY_LOGIN:
            return {
                ...state,
                selectedUserProfile: action.payload,
            };

        case authActionTypes.RECEIVE_USER_SIGNOUT:
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