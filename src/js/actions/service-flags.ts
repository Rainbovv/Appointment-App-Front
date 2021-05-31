import {Dispatch} from "redux";

export enum actionTypes {
    SET_ADMIN_CONTENT_TYPE = "SET_ADMIN_CONTENT_TYPE"
}

export const setAdminContentType = (type: string) => (dispatch: Dispatch) => {
    dispatch({
        type: actionTypes.SET_ADMIN_CONTENT_TYPE,
        payload: type,
    });
}