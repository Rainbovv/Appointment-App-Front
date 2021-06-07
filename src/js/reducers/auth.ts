import {authActionTypes}  from "../actions/auth";
import {PlainObject} from "../types/interfaces/PlainObject";

interface AuthState {
	userData: PlainObject,
	currentUserLoaded: boolean;
	isTokenExpired: boolean
}

const initialState: AuthState = {
	userData : {},
	currentUserLoaded: false,
	isTokenExpired: false,
};

export const auth = (state = initialState, action: PlainObject): AuthState => {
	switch (action.type) {
		case authActionTypes.REQUEST_USER_REGISTER:
			return {
				...state,
				currentUserLoaded: action.payload
			};
		case authActionTypes.RECEIVE_USER_REGISTER:
			return {
				...state,
				currentUserLoaded: true,
			};
		case authActionTypes.RECEIVE_USER_AUTH:
			return {
				...state,
				userData: action.payload,
				currentUserLoaded: true
			};
		case authActionTypes.RECEIVE_USER_SIGNOUT:
			return {
				...state,
				userData: null,
				currentUserLoaded: false,
			}
		case authActionTypes.SET_TOKEN_EXPIRED:
			return {
				...state,
				isTokenExpired: action.payload,
				userData: {},
				currentUserLoaded: false
			}

		default:
			return state
	}
};