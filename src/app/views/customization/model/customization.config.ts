import { HouseElementsTypes } from 'src/app/shared/model/shared.model';

export const CUSTOMIZATION_LIST_VIEW_CONFIG = [
	{ order: 1, type: HouseElementsTypes.CONTAINERS },
	{ order: 2, type: HouseElementsTypes.EXTERIOR },
	{ order: 3, type: HouseElementsTypes.INTERIOR },
	{ order: 4, type: HouseElementsTypes.EQUIPAMIENTO },
	{ order: 5, type: HouseElementsTypes.AUTOSUFICIENCIA }
];

export const MODULE_LITERAL = {
	CO: 'Modulo',
	EX: 'Exterior',
	IN: 'Interior',
	EQ: 'Equipamiento',
	AT: 'Autosuficiencia'
};
