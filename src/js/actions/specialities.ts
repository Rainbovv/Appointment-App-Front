import {routes} from "../config/routes";
import {HttpService} from "../services/HttpService";
import {Dispatch} from "redux";

export enum specialitiesActionTypes {
    GET_SPECIALITIES = "GET_SPECIALITIES",
    GET_SPECIALITIES_LIST = "GET_SPECIALITIES_LIST",
    REQUEST_SPECIALITIES_LIST = "REQUEST_SPECIALITIES_LIST"
}

export const getSpecialitiesList = (dispatch: Dispatch) => {
    const url = routes.BASIC_URL + routes.BASIC_PATH + routes.SPECIALITIES_URL;

    dispatch({
        type: specialitiesActionTypes.REQUEST_SPECIALITIES_LIST,
        payload: false,
    });
    return HttpService.get(url, {})
        .then(response => {
            dispatch({
                type: specialitiesActionTypes.REQUEST_SPECIALITIES_LIST,
                payload: true,
            });

            return dispatch({
                type: specialitiesActionTypes.GET_SPECIALITIES_LIST,
                payload: response,
            });
        })
}