import { ProductTypeCode } from 'src/app/shared/model/shared.model';

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
	type?: ProductTypeCode;
	value: number;
	image: string | null;
}

export interface Product {
	id: string;
	name: string;
    size?: number;
	typeId?: ProductType
	value: number;
	image: string | null;
}


export interface ProductType{
	id:string,
	name:string
	typeCode:ProductTypeCode

}