import {Dispatch} from "redux";
import {HttpService} from "../services/HttpService";
import {PlainObject} from "../types/interfaces/PlainObject";
import {routes} from "../config/routes";


export enum profileActionTypes {
    GET_PROFILES_LIST = "GET_PROFILES_LIST",
    GET_PROFILE_BY_ID = "GET_PROFILE_BY_ID",
    REQUEST_PROFILE_BY_ID = "REQUEST_PROFILE_BY_ID",
    GET_PROFILE_BY_LOGIN = "GET_PROFILE_BY_LOGIN",
    REQUEST_PROFILE_BY_LOGIN = "REQUEST_PROFILE_BY_LOGIN",
    REQUEST_PROFILES_LIST = "REQUEST_PROFILES_LIST",
    GET_PATIENT_PROFILES_LIST = "GET_PATIENT_PROFILES_LIST",
    GET_PERSONAL_PROFILES_LIST = "GET_PERSONAL_PROFILES_LIST",
    GET_PROFILES_BY_SPECIALITY = "GET_PROFILES_BY_SPECIALITY"
}

export const getProfilesList = () => (dispatch: Dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.PROFILE_URL;

    dispatch({
        type: profileActionTypes.REQUEST_PROFILES_LIST,
        payload: false,
    });

    return HttpService.get(url, {})
        .then(response => {
            dispatch({
                type: profileActionTypes.REQUEST_PROFILES_LIST,
                payload: true,
            });

            return dispatch({
                type: profileActionTypes.GET_PROFILES_LIST,
                payload: response,
            });
        })
}
export const getProfilesBySpeciality = (speciality: string) => (dispatch: Dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.PROFILE_URL + "/speciality/" + speciality;

    return HttpService.get(url, {})
        .then(response => {
            dispatch({
                type: profileActionTypes.GET_PROFILES_BY_SPECIALITY,
                payload: response,
            });
        })
}

export const getProfileById = (profileId: number) => (dispatch: Dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.PROFILE_URL + "/" + profileId;

    dispatch({
        type: profileActionTypes.REQUEST_PROFILE_BY_ID,
        payload: false,
    });

    return HttpService.get(url, {})
        .then(response => {
            dispatch({
                type: profileActionTypes.REQUEST_PROFILE_BY_ID,
                payload: true,
            });

            dispatch({
                type: profileActionTypes.GET_PROFILE_BY_ID,
                payload: response,
            });
        })
}

export const getProfileByLogin = (login: string) => (dispatch: Dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.PROFILE_URL + "/login";

    dispatch({
        type: profileActionTypes.REQUEST_PROFILE_BY_LOGIN,
        payload: false,
    });

    return HttpService.put(url, {login})
        .then(response => {
            dispatch({
                type: profileActionTypes.REQUEST_PROFILE_BY_LOGIN,
                payload: true,
            });

            dispatch({
                type: profileActionTypes.GET_PROFILE_BY_LOGIN,
                payload: response,
            });
        })
}

export const deleteProfileAndUser = (profileId: number) => (dispatch: Dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.PROFILE_URL + "/" + profileId;

    return HttpService.delete(url, {})
        .then(response=>{
            return response;
        });
}

export const updateProfile = (profile: PlainObject) => () => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.PROFILE_URL

    return HttpService.put(url, profile)
        .then(response=>{
            return response;
        })
}

export const getPatientProfiles = () => (dispatch: Dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.PROFILE_URL + "/patients";
    
    return HttpService.get(url, {})
        .then(response => {
            dispatch({
                type: profileActionTypes.GET_PATIENT_PROFILES_LIST,
                payload: response,
            });
        })
}

export const getPersonalProfiles = () => (dispatch: Dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.PROFILE_URL + "/personal";

    return HttpService.get(url, {})
        .then(response => {
            dispatch({
                type: profileActionTypes.GET_PERSONAL_PROFILES_LIST,
                payload: response,
            });
        })
}