import {HttpService} from "../services/HttpService";

import {
	AUTH_URL,
	BASIC_PATH,
	BASIC_URL,
	REGISTRATION_URL,
	SIGNOUT_URL
} from "../config/routes";

export const REQUEST_USER_REGISTER = "REQUEST_USER_REGISTER";
export const RECEIVE_USER_REGISTER = "RECEIVE_USER_REGISTER";
export const RECEIVE_USER_AUTH    = "RECEIVE_USER_AUTH";
export const LOADING_CURRENT_USER = "LOADING_CURRENT_USER";
export const RECEIVE_USER_SIGNOUT = "RECEIVE_USER_SIGNOUT";
export const RECEIVE_SIGNUP_DUPLICATED = "RECEIVE_SIGNUP_DUPLICATED";
export const RECEIVE_AUTH_BAD_CREDENTIALS = "RECEIVE_AUTH_BAD_CREDENTIALS";


export const registerNewUser = (userData, history) => (dispatch) => {
	const url = BASIC_URL + BASIC_PATH + REGISTRATION_URL;

	return HttpService.post(url, userData)
	.then(response => {
		if (response === 403) {
			return dispatch({
				type: RECEIVE_SIGNUP_DUPLICATED
			})
		} else if (typeof response === "object") {
			dispatch({
				type: RECEIVE_USER_AUTH,
				payload: response
			});
			history.push("/");
		}
	})
}

export const authUser = (userData) => (dispatch) => {
	const url = BASIC_URL + BASIC_PATH + AUTH_URL;

	return HttpService.post(url, userData)
		.then(response => {
			if (response === 403) {
				return dispatch({
					type: RECEIVE_AUTH_BAD_CREDENTIALS
				})
			} else if (typeof response === "object") {
				return dispatch({
					type: RECEIVE_USER_AUTH,
					payload: response
				})
			}
		})		
}

export const signOutUser = () => (dispatch) => {
	const url = BASIC_URL + BASIC_PATH + SIGNOUT_URL;

	return HttpService.postSignOut(url)
		.then(() => {
			dispatch({
				type: RECEIVE_USER_SIGNOUT
			})
		})
}