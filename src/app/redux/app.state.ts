import { HouseElementsTypes } from '../shared/model/shared.model';
import { Container, Extra, Product } from '../views/customization/model/customization.model';

export const appFeatureKey = 'app';

export interface AppState {
	customizationSelection?: Product;
	isAdmin: boolean;
	route:string
}
export const initialAppState: AppState = {
	isAdmin: false,
	route:''
};
