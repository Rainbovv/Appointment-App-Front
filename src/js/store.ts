import {applyMiddleware, compose, createStore} from "redux";
import reducer from "./reducers/reducer";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import {persistStore} from "redux-persist";
import {PlainObject} from "./types/interfaces/PlainObject";


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
	},
	profiles: {
		profilesListLoaded: boolean;
		profilesList: Array<PlainObject>;
		selectedUserProfile: PlainObject;
		profileContentLoaded: boolean;
	}
};

export const persistor = persistStore(store);

export default {store, persistor};