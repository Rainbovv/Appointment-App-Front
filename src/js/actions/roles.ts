import {Dispatch} from "redux";
import {HttpService} from "../services/HttpService";

import {
    BASIC_PATH,
    BASIC_URL,
    ROLE_URL
} from "../config/routes";


export enum actionTypes {
    GET_ROLES_LIST = "GET_ROLES_LIST",
    
}

export const getRolesList = () => (dispatch: Dispatch) => {
    const url = BASIC_URL + BASIC_PATH + ROLE_URL;
    
    return HttpService.get(url, {})
        .then(response => {
          

            return dispatch({
                type: actionTypes.GET_ROLES_LIST,
                payload: response,
            });
        })
}