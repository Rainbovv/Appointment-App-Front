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
	auth: {
		userData: PlainObject;
		isTokenExpired: boolean;
		currentUserLoaded: boolean;
	},
	errors: {
		isEmailDuplicated: boolean;
		isBadCredentials: boolean;
	},
	serviceFlags: {
		adminContentType: string;
	},
	profiles: {
		patientProfilesList: Array<PlainObject>;
		personalProfilesList: Array<PlainObject>;
		profilesListLoaded: boolean;
		profilesList: Array<PlainObject>;
		selectedUserProfile: PlainObject;
		profileContentLoaded: boolean;
	},
	appointments: {
		patientAppointments: Array<PlainObject>;
		doctorAppointments: Array<PlainObject>;
	},
	roles: {
		userRolesList: Array<PlainObject>;
	}
};

export const persistor = persistStore(store);

export default {store, persistor};