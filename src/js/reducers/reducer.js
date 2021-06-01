import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

import {auth} from "./auth";
import {profiles} from "./profiles";
import {departments} from "./departments";
import {specialities} from "./specialities";
import {serviceFlags} from "./service-flags";
import {errors} from "./errors";

const persistConfig = {
	key: "root",
	storage,
	whitelist: [
		"auth",
		"profiles",
		"serviceFlags",
		"departments",
		"specialities"
	]
}

const rootReducer = combineReducers({
	auth: auth,
	profiles: profiles,
	departments: departments,
	specialities: specialities,
	serviceFlags: serviceFlags,
	errors: errors
});

export default persistReducer(persistConfig, rootReducer);