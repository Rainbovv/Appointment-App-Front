import { RootState } from "../store";
import { PlainObject } from "../types/interfaces/PlainObject";

interface AppointmentsSelectorTypes extends RootState{
    userRolesList: Array<PlainObject>;
}

export const userRolesList = (state: AppointmentsSelectorTypes) => state.roles.userRolesList;