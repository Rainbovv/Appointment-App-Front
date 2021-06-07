import {roleTypes} from "../config/parameters";
import {PlainObject} from "../types/interfaces/PlainObject";
import {store} from "../store";

type Props = {
    userData: PlainObject;
}


export class RoleService {
    static isAdmin(): boolean {
        const appState = store.getState();
        const {
            userData
        } = appState.auth;
        const roles = userData && userData.roles;

        if (userData == null) {
            return false;
        }

        return roles ? roles.indexOf(roleTypes.ADMIN) >= 0 : false;
    }
}

export default RoleService;