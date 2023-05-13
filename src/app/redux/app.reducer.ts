import { Action, createReducer, on } from '@ngrx/store';
import { AppState, initialAppState } from './app.state';
import { getUserRoleError, getUserRoleSuccess, resetCustomSelection, saveCustomSelection } from './app.action';
import { HouseElementsTypes } from '../shared/model/shared.model';

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
			type: HouseElementsTypes.CONTAINERS,
			value: 0,
			image: '',
			description: ''
		}
	})),
	on(getUserRoleSuccess, (state, { isAdmin }) => ({ ...state, isAdmin })),
	on(getUserRoleError, (state) => ({ ...state, isAdmin: false }))
);

export function appReducer(state: AppState | undefined, action: Action) {
	return _appReducer(state, action);
}
