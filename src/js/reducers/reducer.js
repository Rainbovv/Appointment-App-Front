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


const persistConfig = {
	key: "root",
	storage,
	whitelist: [
		"auth",
		"profiles",
		"serviceFlags",
		"departments",
		"specialities",
		"appointments"
	]
}

const rootReducer = combineReducers({
	auth: auth,
	profiles: profiles,
	departments: departments,
	specialities: specialities,
	serviceFlags: serviceFlags,
	appointments: appointments,
	errors: errors
});

export default persistReducer(persistConfig, rootReducer);