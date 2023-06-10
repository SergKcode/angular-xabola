import { Action, createReducer, on } from '@ngrx/store';
import { AppState, initialAppState } from './app.state';
import {
	getProductTypesError,
	getProductTypesSuccess,
	getUserRoleError,
	getUserRoleSuccess,
	resetCustomSelection,
	saveCurrentRoute,
	saveCustomSelection
} from './app.action';
import { ProductTypeCode } from '../shared/model/shared.model';

const _appReducer = createReducer(
	initialAppState,
	on(saveCustomSelection, (state, { customizationSelection }) => ({
		...state,
		customizationSelection
	})),
	on(resetCustomSelection, (state) => ({
		...state,
		customizationSelection: {
			id: '',
			name: '',
			size: 0,
			typeId: { id: '', name: '', typeCode: ProductTypeCode.AUTOSUFICIENCIA },
			value: 0,
			image: '',
			description: ''
		}
	})),
	on(getUserRoleSuccess, (state, { isAdmin }) => ({ ...state, isAdmin })),
	on(getUserRoleError, (state) => ({ ...state, isAdmin: false })),
	on(saveCurrentRoute, (state, { route }) => ({ ...state, route })),
	on(getProductTypesSuccess, (state, { productTypes }) => ({ ...state, productTypes })),
	on(getProductTypesError, (state) => ({ ...state, productTypes: [] }))
);

export function appReducer(state: AppState | undefined, action: Action) {
	return _appReducer(state, action);
}
