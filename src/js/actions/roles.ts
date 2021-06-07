import {Dispatch} from "redux";
import {HttpService} from "../services/HttpService";

import {routes} from "../config/routes";


export enum rolesActionTypes {
    GET_ROLES_LIST = "GET_ROLES_LIST",
    
}

export const getRolesList = () => (dispatch: Dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.ROLE_URL;
    
    return HttpService.get(url, {})
        .then(response => {
          

            return dispatch({
                type: rolesActionTypes.GET_ROLES_LIST,
                payload: response,
            });
        })
}