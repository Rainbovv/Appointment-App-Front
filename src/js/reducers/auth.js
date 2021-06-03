import {
	REQUEST_USER_REGISTER,
	RECEIVE_USER_REGISTER,
	RECEIVE_USER_AUTH,
	RECEIVE_USER_SIGNOUT,
	RECEIVE_AUTH_BAD_CREDENTIALS,
	RECEIVE_SIGNUP_DUPLICATED,
	SET_TOKEN_EXPIRED
}  from "../actions/auth";

const initialState = {
	userData : null,
	currentUserLoaded: false,
	isEmailDuplicated: false,
	isBadCredentials: false,
	isTokenExpired: false,
};

export const auth = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_USER_REGISTER:
			return {
				...state,
				currentUserLoaded: action.payload
			};
		case RECEIVE_USER_REGISTER:
			return {
				...state,
				currentUserLoaded: true,
			};
		case RECEIVE_USER_AUTH:
			return {
				...state,
				userData: action.payload,
				currentUserLoaded: true,
				isBadCredentials: false
			};
		case RECEIVE_USER_SIGNOUT:
			return {
				...state,
				userData: null,
				currentUserLoaded: false,
			}
		case RECEIVE_AUTH_BAD_CREDENTIALS:
			return {
				...state,
				isBadCredentials: true,
			}
		case RECEIVE_SIGNUP_DUPLICATED:
			return {
				...state,
				isEmailDuplicated: true,
			}
		case SET_TOKEN_EXPIRED:
			return {
				...state,
				isTokenExpired: action.payload,
				userData: null,
				currentUserLoaded: false
			}

		default:
			return state
	}
};