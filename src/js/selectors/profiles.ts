import {RootState} from "../store";
import {PlainObject} from "../types/interfaces/PlainObject";

interface ProfilesSelectorTypes extends RootState{
    profileContentLoaded: boolean;
    selectedUserProfile: PlainObject;
    profilesBySpeciality: Array<PlainObject>;
}

export const profileContentLoaded = (state: ProfilesSelectorTypes) => state.profiles.profileContentLoaded;
export const selectedUserProfile = (state: ProfilesSelectorTypes) => state.profiles.selectedUserProfile;
export const profilesBySpeciality = (state: ProfilesSelectorTypes) => state.profiles.profilesBySpeciality;