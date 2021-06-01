import {
	RECEIVE_AUTH_BAD_CREDENTIALS,
	RECEIVE_SIGNUP_DUPLICATED
}  from "../actions/auth";

const initialState = {
	isEmailDuplicated: false,
	isBadCredentials: false,
};

export const errors = (state = initialState, action) => {
	switch (action.type) {
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
		default:
			return state
	}
};