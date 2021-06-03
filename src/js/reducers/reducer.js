import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import {auth} from "./auth";
import {profiles} from "./profiles";
import {departments} from "./departments";
import {specialities} from "./specialities";
import {serviceFlags} from "./service-flags";
import {errors} from "./errors";
import storage from "redux-persist/lib/storage";
import {appointments} from "./appointments";
import {roles} from "./roles";

const persistConfig = {
	key: "root",
	storage,
	whitelist: [
		"auth",
		"serviceFlags",
		"departments",
		"specialities",
	]
}

const rootReducer = combineReducers({
	auth: auth,
	profiles: profiles,
	departments: departments,
	specialities: specialities,
	serviceFlags: serviceFlags,
	appointments: appointments,
	errors: errors,
	roles: roles
});


export default persistReducer(persistConfig, rootReducer);