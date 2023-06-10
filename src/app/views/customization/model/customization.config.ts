import { ProductTypeCode } from 'src/app/shared/model/shared.model';

export const CUSTOMIZATION_LIST_VIEW_CONFIG = [
	{ order: 1, type: ProductTypeCode.CONTAINERS },
	{ order: 2, type: ProductTypeCode.EXTERIOR },
	{ order: 3, type: ProductTypeCode.INTERIOR },
	{ order: 4, type: ProductTypeCode.EQUIPAMIENTO },
	{ order: 5, type: ProductTypeCode.AUTOSUFICIENCIA }
];

export const MODULE_LITERAL = {
	CO: 'Modulo',
	EX: 'Exterior',
	IN: 'Interior',
	EQ: 'Equipamiento',
	AT: 'Autosuficiencia'
};
