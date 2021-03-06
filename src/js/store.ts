import {applyMiddleware, compose, createStore} from "redux";
import reducer from "./reducers/reducer";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import {persistStore} from "redux-persist";
import {PlainObject} from "./types/interfaces/PlainObject";

let middleware: Array<any>

if (process.env.NODE_ENV === "development") {
	middleware = [
		thunk,
		createLogger()
	];
} else {
	middleware = [thunk]
}

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
        profilesBySpeciality: Array<PlainObject>;
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
	departments: {
		departmentsLoaded: boolean;
		departments: Array<PlainObject>;
	}
	specialities: {
		specialities: Array<PlainObject>,
		specialitiesLoaded: boolean,
	}
};

export const persistor = persistStore(store);

export default {store, persistor};