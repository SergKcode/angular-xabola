import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, appFeatureKey } from './app.state';
import { Product, ProductType } from '../shared/model/shared.model';


export const selectAppState = createFeatureSelector<AppState>(appFeatureKey);
export const selectCustomizationSelection = createSelector(
	selectAppState,
	(state: AppState): Product | undefined => state?.customizationSelection
);
export const selectIsAdmin = createSelector(selectAppState, (state: AppState): boolean => !!state.isAdmin);
export const selectCurrentRoute = createSelector(selectAppState, (state: AppState): string => state.route);
export const selectProductTypes = createSelector(
	selectAppState,
	(state: AppState): ProductType[] => state.productTypes
);
