import { createAction, props } from "@ngrx/store";
import { GenericObject } from "../shared/model/shared.model";

export enum AppActions {
    SAVE_CUSTOM_SELECTION = '[APP STATE]: Saving App customization selection',
    SAVE_USER_ROLE = '[APP STATE]: Saving App user role',
    RESET_CUSTOM_SELECTION = '[APP STATE]: Reset App customization selection',
    GET_USER_ROLE = '[APP STATE]: Getting user role'
}

export enum AppActionsSuccess {

    GET_USER_ROLE_SUCCESS = '[APP STATE]: Get user role success'
}
export enum AppActionsError {

    GET_USER_ROLE_ERROR = '[APP STATE]: Get user role error'
}
/**
 * 
 */
export const saveCustomSelection = createAction(AppActions.SAVE_CUSTOM_SELECTION, props<{ customizationSelection: GenericObject }>())
/**
 * 
 */
export const saveUserRole = createAction(AppActions.SAVE_USER_ROLE, props<{ isAdmin: boolean }>())
/**
 * 
 */
export const resetCustomSelection = createAction(AppActions.RESET_CUSTOM_SELECTION)
/**
 * 
 */
export const getUserRole = createAction(AppActions.GET_USER_ROLE)


/**
 * 
 */
export const getUserRoleSuccess = createAction(AppActionsSuccess.GET_USER_ROLE_SUCCESS, props<{ isAdmin: boolean }>())
/**
 * 
 */
export const getUserRoleError = createAction(AppActionsError.GET_USER_ROLE_ERROR)