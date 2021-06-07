import {PlainObject} from "../interfaces/PlainObject";

export interface AuthState {
    userData: PlainObject,
    currentUserLoaded: boolean;
    isTokenExpired: boolean
}

export enum actionTypes {
    REQUEST_USER_REGISTER = "REQUEST_USER_REGISTER",
    RECEIVE_USER_REGISTER = "RECEIVE_USER_REGISTER",
    RECEIVE_USER_AUTH = "RECEIVE_USER_AUTH",
    RECEIVE_USER_SIGNOUT = "RECEIVE_USER_SIGNOUT",
    RECEIVE_SIGNUP_DUPLICATED = "RECEIVE_SIGNUP_DUPLICATED",
    RECEIVE_AUTH_BAD_CREDENTIALS = "RECEIVE_AUTH_BAD_CREDENTIALS",
    SET_TOKEN_EXPIRED = "SET_TOKEN_EXPIRED"

}

interface UserRegisterAction {
    type: actionTypes.REQUEST_USER_REGISTER,
    payload: boolean
}

interface ReceiveUserAuthAction {

}

