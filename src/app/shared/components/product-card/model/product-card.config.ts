import { ProductTypeCode } from 'src/app/shared/model/shared.model';

export const productTypes = {
	[ProductTypeCode.AUTOSUFICIENCIA]: 'Autosuficiencia',
	[ProductTypeCode.EXTERIOR]: 'Exterior',
	[ProductTypeCode.INTERIOR]: 'Interior',
	[ProductTypeCode.EQUIPAMIENTO]: 'Equipamiento'
};

export enum StyleProductsStatus {
	SELECTED = 'flex w-full bg-cyan-300 shadow-lg rounded-lg overflow-hidden',
	NOT_SELECTED = 'flex w-full bg-white shadow-lg rounded-lg overflow-hidden'
}
