import { createAction, props } from "@ngrx/store";
import { Product, ProductType } from "../shared/model/shared.model";


export enum AppActions {
    SAVE_CUSTOM_SELECTION = '[APP STATE]: Saving App customization selection',
    SAVE_USER_ROLE = '[APP STATE]: Saving App user role',
    RESET_CUSTOM_SELECTION = '[APP STATE]: Reset App customization selection',
    GET_USER_ROLE = '[APP STATE]: Getting user role',
    GET_CURRENT_ROUTE= '[APP STATE]: Getting current route',
    GET_PRODUCT_TYPES = '[APP STATE]: Get product types'
}

export enum AppActionsSuccess {
    GET_USER_ROLE_SUCCESS = '[APP STATE]: Get user role success',
    GET_PRODUCT_TYPES_SUCCESS = '[APP STATE]: Get product types success'
}
export enum AppActionsError {
    GET_USER_ROLE_ERROR = '[APP STATE]: Get user role error',
    GET_PRODUCT_TYPES_ERROR = '[APP STATE]: Get product types error'
}

/**
 * 
 */
export const saveCustomSelection = createAction(AppActions.SAVE_CUSTOM_SELECTION, props<{ customizationSelection:Product}>())

/**
 * 
 */
export const saveCurrentRoute = createAction(AppActions.GET_CURRENT_ROUTE, props<{ route: string }>())


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

/**
 * 
 */
export const getProductTypes = createAction(AppActions.GET_PRODUCT_TYPES)


/**
 * 
 */
export const getProductTypesSuccess = createAction(AppActionsSuccess.GET_PRODUCT_TYPES_SUCCESS, props<{ productTypes: ProductType[] }>())

/**
 * 
 */
export const getProductTypesError = createAction(AppActionsError.GET_USER_ROLE_ERROR)