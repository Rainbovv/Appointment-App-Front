import {Dispatch} from "redux";
import {HttpService} from "../services/HttpService";

import {
    BASIC_PATH,
    BASIC_URL,
    USERS_URL
} from "../config/routes";


export enum actionTypes {
    GET_USERS_LIST = "GET_USERS_LIST",
    REQUEST_USERS_LIST = "REQUEST_USERS_LIST"
}

export const getUserList = () => (dispatch: Dispatch) => {
    const url = BASIC_URL + BASIC_PATH + USERS_URL;

    dispatch({
        type: actionTypes.REQUEST_USERS_LIST,
        payload: true,
    });

    return HttpService.get(url, {})
        .then(response => {
            dispatch({
                type: actionTypes.REQUEST_USERS_LIST,
                payload: false,
            });

            return dispatch({
                type: actionTypes.GET_USERS_LIST,
                payload: response,
            });
        })
}