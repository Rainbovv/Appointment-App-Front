import {RootState} from "../store";

export const getSpecialities = (state: RootState) => state.specialities.specialities
export const getSpecialitiesLoaded = (state: RootState) => state.specialities.specialitiesLoaded