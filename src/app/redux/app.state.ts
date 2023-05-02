
import { GenericObject } from "../shared/model/shared.model";

export const appFeatureKey = 'app'

export interface AppState {
    customizationSelection: GenericObject;
    isAdmin: boolean
}
export const initialAppState: AppState = {
    customizationSelection: {},
    isAdmin: false
} 