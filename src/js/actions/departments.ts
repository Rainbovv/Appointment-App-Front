import {routes} from "../config/routes";
import {HttpService} from "../services/HttpService";
import {Dispatch} from "redux";

export enum departmentsActionTypes {
    GET_DEPARTMENTS_LIST = "GET_DEPARTMENTS_LIST",
    REQUEST_DEPARTMENTS_LIST = "REQUEST_DEPARTMENTS_LIST"
}


export const getDepartmentsList = (dispatch: Dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.DEPARTMENTS_URL;

    dispatch({
        type: departmentsActionTypes.REQUEST_DEPARTMENTS_LIST,
        payload: false,
    });
    return HttpService.get(url, {})
        .then(response => {
            dispatch({
                type: departmentsActionTypes.REQUEST_DEPARTMENTS_LIST,
                payload: true,
            });

            return dispatch({
                type: departmentsActionTypes.GET_DEPARTMENTS_LIST,
                payload: response,
            });
        })
}

