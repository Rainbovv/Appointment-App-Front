import {HttpService} from "../services/HttpService";

import {
	AUTH_URL,
	BASIC_PATH,
	BASIC_URL,
	REGISTRATION_URL
} from "../config/routes";

export const REQUEST_USER_REGISTER = "REQUEST_USER_REGISTER";
export const RECEIVE_USER_REGISTER = "RECEIVE_USER_REGISTER";
export const RECEIVE_USER_AUTH    = "RECEIVE_USER_AUTH";
export const LOADING_CURRENT_USER = "LOADING_CURRENT_USER";


export const registerNewUser = (userData) => (dispatch) => {
//	let requestParams = {};
	const url = BASIC_URL + BASIC_PATH + REGISTRATION_URL;

	// if (userData.userName && userData.password) {
	// 	requestParams["userName"] = userData.userName;
	// 	requestParams["password"] = userData.password;
	// }

	dispatch({
		type: REQUEST_USER_REGISTER,
		payload: true,
	});

	return HttpService.post(url, userData)
		.then(response => {
			dispatch({
				type: REQUEST_USER_REGISTER,
				payload: false,
			});

			return dispatch({
				type: RECEIVE_USER_AUTH,
				payload: response,
			});
		})
}

export const authUser = (userData) => (dispatch) => {
	// let requestParams = {};
	const url = BASIC_URL + BASIC_PATH + AUTH_URL;

	// if (userData.userName && userData.password) {
	// 	requestParams["userName"] = userData.userName;
	// 	requestParams["password"] = userData.password;
	// }

	dispatch({
		type: REQUEST_USER_REGISTER,
		payload: true,
	});

	return HttpService.post(url, userData)
		.then(response => {
			dispatch({
				type: REQUEST_USER_REGISTER,
				payload: false,
			});

			return dispatch({
				type: RECEIVE_USER_AUTH,
				payload: response,
			})
		})
}