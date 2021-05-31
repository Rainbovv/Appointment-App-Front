import {actionTypes} from "../actions/service-flags";
import {PlainObject} from "../types/interfaces/PlainObject";

type serviceFlagsTypes = {
    adminContentType: string
}

const initialState: serviceFlagsTypes = {
    adminContentType : "patient",
};

export const serviceFlags = (state = initialState, action: PlainObject) => {
    switch (action.type) {
        case actionTypes.SET_ADMIN_CONTENT_TYPE:
            return {
                ...state,
                adminContentType: action.payload
            };
        default:
            return state
    }
};