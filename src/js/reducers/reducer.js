import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

import {auth} from "./auth";
import {departments} from "./departments";
import {specialities} from "./specialities";
import {serviceFlags} from "./service-flags";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth"]
}

const rootReducer = combineReducers({
	auth: auth,
	departments: departments,
	specialities: specialities,
	serviceFlags: serviceFlags
});

export default persistReducer(persistConfig, rootReducer);