import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AppState, appFeatureKey } from "./app.state"
import { GenericObject } from "../shared/model/shared.model"

export const selectAppState = createFeatureSelector<AppState>(appFeatureKey)
export const selectCustomizationSelection = createSelector(selectAppState, (state: AppState): GenericObject => state.customizationSelection)
export const selectIsAdmin = createSelector(selectAppState, (state: AppState): boolean => !!state.isAdmin)