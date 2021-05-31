import {
	REQUEST_USER_REGISTER,
	RECEIVE_USER_REGISTER,
	RECEIVE_USER_AUTH,
	RECEIVE_USER_SIGNOUT
}  from "../actions/auth";


const initialState = {
	userData : null,
	currentUserLoaded: false,
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
			};
		case RECEIVE_USER_SIGNOUT:
			return {
				...state,
				userData: null,
				currentUserLoaded: false,
			}
		default:
			return state
	}
};