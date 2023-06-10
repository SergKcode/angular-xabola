import { ProductTypeCode, ProductTypes } from '../shared/model/shared.model';
import { Container, Extra, Product } from '../views/customization/model/customization.model';

export const appFeatureKey = 'app';

export interface AppState {
	productTypes:ProductTypes[]
	isAdmin: boolean;
	route:string
	customizationSelection?: Product;
}
export const initialAppState: AppState = {
	isAdmin: false,
	route:'',
	productTypes:[]
};
