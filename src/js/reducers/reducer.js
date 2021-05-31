import {combineReducers} from "redux";
import {auth} from "./auth";
import {departments} from "./departments";
import {specialities} from "./specialities";
import {serviceFlags} from "./service-flags";

const rootReducer = combineReducers({
	auth: auth,
	departments: departments,
	specialities: specialities,
	serviceFlags: serviceFlags
});

export default rootReducer