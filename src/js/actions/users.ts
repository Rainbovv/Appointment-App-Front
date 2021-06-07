import {Dispatch} from "redux";
import {HttpService} from "../services/HttpService";

import {
    BASIC_PATH,
    BASIC_URL,
    USERS_URL
} from "../config/routes";
import {PlainObject} from "../types/interfaces/PlainObject";


export enum actionTypes {
    CREATE_USER = "CREATE_USER",
    EDIT_USER = "EDIT_USER"
}

export const createUser = (userData: PlainObject, history: PlainObject) => (dispatch: Dispatch) => {
    const url = BASIC_URL + BASIC_PATH + USERS_URL;

    return HttpService.post(url, userData)
        .then(response => {
            return dispatch({
                type: actionTypes.CREATE_USER,
                payload: response,
            });

            history.push("/admin");
        })
}
export const editUser = (userData: PlainObject, history: PlainObject) => (dispatch: Dispatch) => {
    const url = BASIC_URL + BASIC_PATH + USERS_URL;

    return HttpService.put(url, userData)
        .then(response => {
            history.push("/admin");
        })
}