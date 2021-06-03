import {applyMiddleware, compose, createStore} from "redux";
import reducer from "./reducers/reducer";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import {persistStore} from "redux-persist";
import {PlainObject} from "./types/interfaces/PlainObject";
import thunkMiddleware from 'redux-thunk-recursion-detect';
import createThunkErrorHandlerMiddleware from 'redux-thunk-error-handler';

//@ts-ignore
const myErrorHandler = (err) => {
	console.error(err); // write the error to the console
	// your logic here to determine what should be done on different error types
	if (err.message === 'auth_failed') {
		return logoutThunk;
	}
}
//@ts-ignore
const logoutThunk = async (dispatch) => {
	dispatch({ type: 'showLogoutModal' });
}

const errorHandlerMiddleware = createThunkErrorHandlerMiddleware({ onError: myErrorHandler });

const middleware = [
	thunk,
	errorHandlerMiddleware,
	thunkMiddleware,
	createLogger()
];

export const store = createStore(
	reducer,
	compose(applyMiddleware(...middleware))
);

export type RootState = {
	serviceFlags: {
		adminContentType: string;
	},
	profiles: {
		profilesListLoaded: boolean;
		profilesList: Array<PlainObject>
	}
};

export const persistor = persistStore(store);

export default {store, persistor};