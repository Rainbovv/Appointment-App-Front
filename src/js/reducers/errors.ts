import {authActionTypes}  from "../actions/auth";
import {PlainObject} from "../types/interfaces/PlainObject";

interface ErrorState {
	isEmailDuplicated: boolean;
	isBadCredentials: boolean;
}

const initialState: ErrorState = {
	isEmailDuplicated: false,
	isBadCredentials: false,
};

export const errors = (state = initialState, action: PlainObject): ErrorState => {
	switch (action.type) {
		case authActionTypes.RECEIVE_AUTH_BAD_CREDENTIALS:
			return {
				...state,
				isBadCredentials: true,
			}
		case authActionTypes.RECEIVE_SIGNUP_DUPLICATED:
			return {
				...state,
				isEmailDuplicated: true,
			}
		default:
			return state
	}
};