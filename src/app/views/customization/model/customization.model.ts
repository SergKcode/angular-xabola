export enum CustomizationTypes{
    CONTAINERS= 'CO',
    EXTERIOR='EX',
    INTERIOR='IN',
    EQUIPAMIENTO='EQ',
    AUTOSUFICIENCIA='AT'
}

export interface Container{
    id:string,
    name:string,
    size:number,
    value: number,
    image: string|null
}

export interface Extra{
    id:string,
    name: string,
    type: CustomizationTypes,
    value: number
    image: string|null

}
