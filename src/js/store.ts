import {applyMiddleware, compose, createStore} from "redux";
import reducer from "./reducers/reducer";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";


const middleware = [
	thunk,
	createLogger()
];

export const store = createStore(
	reducer,
	compose(applyMiddleware(...middleware))
);

export type RootState = {
	serviceFlags: {
		adminContentType: string;
	}
};