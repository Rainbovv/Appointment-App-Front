import {combineReducers} from "redux";
import {auth} from "./auth";
import {departments} from "./departments";
import {specialities} from "./specialities";

const rootReducer = combineReducers({
	auth: auth,
	departments: departments,
	specialities: specialities
});

export default rootReducer