// import {Dispatch} from "redux";
// import {HttpService} from "../services/HttpService";
// import {PlainObject} from "../types/interfaces/PlainObject";
//
// import {
//     BASIC_PATH,
//     BASIC_URL,
//     DEPARTMENTS_URL, PROFILE_URL
// } from "../config/routes";
//
// export enum actionTypes {
//     GET_DEPARTMENTS_LIST = "GET_DEPARTMENTS_LIST",
//     REQUEST_DEPARTMENTS_LIST = "REQUEST_DEPARTMENTS_LIST",
// }
//
// export const getDepartmentsList = () => (dispatch: Dispatch) => {
//     const url = BASIC_URL + BASIC_PATH + PROFILE_URL;
//
//     return HttpService.get(url, {})
//         .then(response => {
//             dispatch({
//                 type: actionTypes.REQUEST_DEPARTMENTS_LIST,
//                 payload: true,
//             });...

export enum departmentsActionTypes {
    GET_DEPARTMENTS = "GET_DEPARTMENTS"
}