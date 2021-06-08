import {Dispatch} from "redux";
import {HttpService} from "../services/HttpService";

import {routes} from "../config/routes";
import {PlainObject} from "../types/interfaces/PlainObject";

export enum usersActionTypes {
    CREATE_USER = "CREATE_USER",
    EDIT_USER = "EDIT_USER"
}


export const createUser = (userData: PlainObject, history: PlainObject) => (dispatch: Dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.USERS_URL;

    return HttpService.post(url, userData)
        .then(response => {
            return dispatch({
                type: usersActionTypes.CREATE_USER,
                payload: response,
            });

            history.push("/admin");
        })
}
export const editUser = (userData: PlainObject, history: PlainObject) => (dispatch: Dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.USERS_URL;

    return HttpService.put(url, userData)
        .then(response => {
            history.push("/admin");
        })
}