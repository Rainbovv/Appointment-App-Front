import {roleTypes} from "../config/parameters";
import {PlainObject} from "../types/interfaces/PlainObject";
import {store} from "../store";

type Props = {
    userData: PlainObject;
}

export class RoleService {
     appState = store.getState();
    
     isAdmin(): boolean {
        const {
            userData
        } = this.appState.auth;

        const roles = userData && userData.roles;

        if (userData == null) {
            return false;
        }

        return roles.indexOf(roleTypes.ADMIN) >= 0;
    }
}

export default RoleService;