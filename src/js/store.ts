import {applyMiddleware, compose, createStore} from "redux";
import reducer from "./reducers/reducer";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import {persistStore} from "redux-persist";


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

export const persistor = persistStore(store);

export default {store, persistor};