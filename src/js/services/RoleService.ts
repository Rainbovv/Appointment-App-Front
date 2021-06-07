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
        }: PlainObject = this.appState.auth;

        const roles = userData && userData.roles;

        if (userData == null) {
            return false;
        }

        return roles ? roles.indexOf(roleTypes.ADMIN) >= 0 : false;
    }
}

export default RoleService;