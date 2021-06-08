import {HttpService} from "../services/HttpService";

import {
    BASIC_PATH,
    BASIC_URL,
    DEPARTMENTS_URL,
} from "../config/routes";

export const GET_DEPARTMENTS_LIST = "GET_DEPARTMENTS_LIST"
export const REQUEST_DEPARTMENTS_LIST = "REQUEST_DEPARTMENTS_LIST"


export const getDepartmentsList = (dispatch) => {
    const url = BASIC_URL + BASIC_PATH + DEPARTMENTS_URL;

    dispatch({
        type: REQUEST_DEPARTMENTS_LIST,
        payload: false,
    });
    return HttpService.get(url, {})
        .then(response => {
            dispatch({
                type: REQUEST_DEPARTMENTS_LIST,
                payload: true,
            });

            return dispatch({
                type: GET_DEPARTMENTS_LIST,
                payload: response,
            });
        })
}