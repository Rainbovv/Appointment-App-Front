import {RootState} from "../store";

export const getDepartments = (state: RootState) => state.departments.departments
export const getDepartmentsLoaded = (state: RootState) => state.departments.departmentsLoaded;