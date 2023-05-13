import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, appFeatureKey } from './app.state';
import { Container, Extra, Product } from '../views/customization/model/customization.model';
import { MODULE_LITERAL } from '../views/customization/model/customization.config';
import { HouseElementsTypes } from '../shared/model/shared.model';

export const selectAppState = createFeatureSelector<AppState>(appFeatureKey);
export const selectCustomizationSelection = createSelector(selectAppState, (state: AppState): Product | undefined => {
	if (state?.customizationSelection) {
		const copy = { ...state.customizationSelection };
		if (!state?.customizationSelection?.type) {
			copy['description'] = MODULE_LITERAL['CO'];
		} else {
			const type = copy.type || 'EX';
			copy['description'] = MODULE_LITERAL[type];
		}
		return copy;
	}

	return state?.customizationSelection;
});
export const selectIsAdmin = createSelector(selectAppState, (state: AppState): boolean => !!state.isAdmin);
