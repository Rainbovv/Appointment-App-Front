import {HttpService} from "../services/HttpService";
import {roleTypes} from "../config/parameters";
import {PlainObject} from "../types/interfaces/PlainObject";
import {Dispatch} from "redux";
import {History} from "history";

import {routes} from "../config/routes";


export enum authActionTypes {
	REQUEST_USER_REGISTER = "REQUEST_USER_REGISTER",
	RECEIVE_USER_REGISTER = "RECEIVE_USER_REGISTER",
	RECEIVE_USER_AUTH = "RECEIVE_USER_AUTH",
	RECEIVE_USER_SIGNOUT = "RECEIVE_USER_SIGNOUT",
	RECEIVE_SIGNUP_DUPLICATED = "RECEIVE_SIGNUP_DUPLICATED",
	RECEIVE_AUTH_BAD_CREDENTIALS = "RECEIVE_AUTH_BAD_CREDENTIALS",
	SET_TOKEN_EXPIRED = "SET_TOKEN_EXPIRED"

}

export const registerNewUser = (userData: PlainObject, history: History) => (dispatch: Dispatch) => {
	const url = routes.BASIC_URL + routes.BASIC_PATH + routes.REGISTRATION_URL;

	return HttpService.post(url, userData)
		.then(response => {
			if (response === 403) {
				return dispatch({
					type: authActionTypes.RECEIVE_SIGNUP_DUPLICATED
				})
			} else if (typeof response === "object") {
				if (userData && userData.creator && userData.creator === roleTypes.ADMIN) {
					history.push("/admin");
				} else {
					dispatch({
						type: authActionTypes.RECEIVE_USER_AUTH,
						payload: response
					});

					history.push("/");
				}
			}
		})
}

export const authUser = (userData: PlainObject) => (dispatch: Dispatch) => {
	const url = routes.BASIC_URL + routes.BASIC_PATH + routes.AUTH_URL;

	return HttpService.post(url, userData)
		.then(response => {
			if (response === 403) {
				return dispatch({
					type: authActionTypes.RECEIVE_AUTH_BAD_CREDENTIALS
				})
			} else if (typeof response === "object") {
				return dispatch({
					type: authActionTypes.RECEIVE_USER_AUTH,
					payload: response
				})
			}
		})
}

export const signOutUser = (history: History) => (dispatch: Dispatch) => {
	const url = routes.BASIC_URL + routes.BASIC_PATH + routes.SIGNOUT_URL;

	return HttpService.postSignOut(url)
		.then(() => {
			dispatch({
				type: authActionTypes.RECEIVE_USER_SIGNOUT
			});
			history.push("/");
		})
}

export const setTokenExpired = () => (dispatch: Dispatch) => {
	dispatch({
		type: authActionTypes.SET_TOKEN_EXPIRED,
		payload: true
	});
}