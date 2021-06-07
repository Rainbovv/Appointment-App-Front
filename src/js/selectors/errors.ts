import {RootState} from "../store";

interface ErrorsSelectorTypes extends RootState {
    isEmailDuplicated: boolean;
    isBadCredentials: boolean;
}

export const getEmailDuplicated = (state: ErrorsSelectorTypes) => state.errors.isEmailDuplicated;
export const getBadCredentials = (state: ErrorsSelectorTypes) => state.errors.isBadCredentials;