import {RootState} from "../store";
import {PlainObject} from "../types/interfaces/PlainObject";

interface AuthSelectorTypes extends RootState{
    userData: PlainObject;
    currentUserLoaded: boolean;
    isTokenExpired: boolean;
}


export const getUserData = (state: AuthSelectorTypes) => state.auth.userData;
export const getUserLoaded = (state: AuthSelectorTypes) => state.auth.currentUserLoaded;
export const getTokenExpired = (state: AuthSelectorTypes) => state.auth.isTokenExpired;

