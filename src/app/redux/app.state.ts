import { Product, ProductType } from "../shared/model/shared.model";


export const appFeatureKey = 'app';

export interface AppState {
	productTypes:ProductType[]
	isAdmin: boolean;
	route:string
	customizationSelection?: Product;
}

export const initialAppState: AppState = {
	isAdmin: false,
	route:'',
	productTypes:[]
};
