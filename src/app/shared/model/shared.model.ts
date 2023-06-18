export interface MenuList {
	id: number;
	order: number;
	label: string;
	route: AppRoutes;
}

export enum AppRoutes {
	CUSTOMIZATION = 'personaliza',
	CONTACT = 'contacto',
	ABOUT_US = 'sobre-nosotros',
	LOGIN = 'login',
	ADMIN = 'admin',
	HOME = 'inicio'
}

export interface GenericObject {
	[key: string]: any;
}

export enum ProductTypeCode {
	CONTAINERS = 'CO',
	EXTERIOR = 'EX',
	INTERIOR = 'IN',
	EQUIPAMIENTO = 'EQ',
	AUTOSUFICIENCIA = 'AT'
}

export const enum administrationAction {
	EDIT = 'edit',
	ADD = 'add',
	DELETE = 'delete'
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