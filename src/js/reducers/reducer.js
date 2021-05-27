import {combineReducers} from "redux";
import {auth} from "./auth";
import {departments} from "./departments";
import {specialities} from "./specialities";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth"]
}

const rootReducer = combineReducers({
	auth: auth,
	departments: departments,
	specialities: specialities
});

export default persistReducer(persistConfig, rootReducer);