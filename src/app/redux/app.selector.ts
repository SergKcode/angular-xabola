import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, appFeatureKey } from './app.state';
import { Container, Extra, Product } from '../views/customization/model/customization.model';
import { MODULE_LITERAL } from '../views/customization/model/customization.config';
import { ProductTypeCode, ProductTypes } from '../shared/model/shared.model';

export const selectAppState = createFeatureSelector<AppState>(appFeatureKey);
export const selectCustomizationSelection = createSelector(
	selectAppState,
	(state: AppState): Product | undefined => state?.customizationSelection
);
export const selectIsAdmin = createSelector(selectAppState, (state: AppState): boolean => !!state.isAdmin);
export const selectCurrentRoute = createSelector(selectAppState, (state: AppState): string => state.route);
export const selectProductTypes = createSelector(
	selectAppState,
	(state: AppState): ProductTypes[] => state.productTypes
);
