import {routes} from "../config/routes";
import {HttpService} from "../services/HttpService";
import {Dispatch} from "redux";

export enum holidaysActionTypes {
    GET_HOLIDAYS = "GET_HOLIDAYS",
    GET_HOLIDAYS_LIST = "GET_HOLIDAYS_LIST",
    REQUEST_HOLIDAYS_LIST = "REQUEST_HOLIDAYS_LIST"
}

export const getHolidaysList = (dispatch: Dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.SPECIALITIES_URL;

    dispatch({
        type: holidaysActionTypes.REQUEST_HOLIDAYS_LIST,
        payload: false,
    });
    return HttpService.get(url, {})
        .then(response => {
            dispatch({
                type: holidaysActionTypes.REQUEST_HOLIDAYS_LIST,
                payload: true,
            });

            return dispatch({
                type: holidaysActionTypes.GET_HOLIDAYS_LIST,
                payload: response,
            });
        })
}