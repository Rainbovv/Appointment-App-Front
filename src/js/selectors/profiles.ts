import {RootState} from "../store";
import {PlainObject} from "../types/interfaces/PlainObject";

interface ProfilesSelectorTypes extends RootState{
    profileContentLoaded: boolean;
    selectedUserProfile: PlainObject;
}

export const profileContentLoaded = (state: ProfilesSelectorTypes) => state.profiles.profileContentLoaded;
export const selectedUserProfile = (state: ProfilesSelectorTypes) => state.profiles.selectedUserProfile