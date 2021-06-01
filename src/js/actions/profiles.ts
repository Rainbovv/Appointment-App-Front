import {Dispatch} from "redux";
import {HttpService} from "../services/HttpService";

import {
    BASIC_PATH,
    BASIC_URL,
    PROFILE_URL
} from "../config/routes";


export enum actionTypes {
    GET_PROFILES_LIST = "GET_PROFILES_LIST",
    REQUEST_PROFILES_LIST = "REQUEST_PROFILES_LIST"
}

export const getProfilesList = () => (dispatch: Dispatch) => {
    const url = BASIC_URL + BASIC_PATH + PROFILE_URL;

    dispatch({
        type: actionTypes.REQUEST_PROFILES_LIST,
        payload: false,
    });

    return HttpService.get(url, {})
        .then(response => {
            dispatch({
                type: actionTypes.REQUEST_PROFILES_LIST,
                payload: true,
            });

            return dispatch({
                type: actionTypes.GET_PROFILES_LIST,
                payload: response,
            });
        })
}

export const getProfileById = (profileId: number) => (dispatch: Dispatch) => {
    const url = BASIC_URL + BASIC_PATH + PROFILE_URL + "/" + profileId;

    return HttpService.get(url, {})
        .then(response => {
        })
}

export const deleteProfileAndUser = (profileId: number) => (dispatch: Dispatch) => {
    const url = BASIC_URL + BASIC_PATH + PROFILE_URL + "/" + profileId;

    return HttpService.delete(url, {});
}