import {HttpService} from "../services/HttpService";

import {
    BASIC_PATH,
    BASIC_URL,
    SPECIALITIES_URL,
} from "../config/routes";

export const GET_SPECIALITIES_LIST = "GET_SPECIALITIES_LIST"
export const REQUEST_SPECIALITIES_LIST = "REQUEST_SPECIALITIES_LIST"


export const getSpecialitiesList = (dispatch) => {
    const url = BASIC_URL + BASIC_PATH + SPECIALITIES_URL;

    dispatch({
        type: REQUEST_SPECIALITIES_LIST,
        payload: false,
    });
    return HttpService.get(url, {})
        .then(response => {
            dispatch({
                type: REQUEST_SPECIALITIES_LIST,
                payload: true,
            });

            return dispatch({
                type: GET_SPECIALITIES_LIST,
                payload: response,
            });
        })
}