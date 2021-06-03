import {RootState} from "../store";

interface ProfilesSelectorTypes extends RootState {
    adminContentType: string
}

export const adminContentType = (state: ProfilesSelectorTypes) => state.serviceFlags.adminContentType;