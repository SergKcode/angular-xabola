import { HouseElementsTypes } from 'src/app/shared/model/shared.model';

export interface Container {
	id: string;
	name: string;
	size: number;
	value: number;
	image: string | null;
}

export interface Extra {
	id: string;
	name: string;
	type?: HouseElementsTypes;
	value: number;
	image: string | null;
}

export interface Product {
	id: string;
	name: string;
    size?: number;
	type?: HouseElementsTypes;
	value: number;
	image: string | null;
	description?: string;
}
