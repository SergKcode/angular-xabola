export interface MenuList{
    id:number,
    order:number,
    label:string,
    route: AppRoutes
}

export enum AppRoutes{
    CUSTOMIZATION='personaliza',
    CONTACT='contacto',
    ABOUT_US='sobre-nosotros',
    LOGIN='login',
    ADMIN='admin',
    HOME='inicio'
}

export interface GenericObject{
    [key:string]:any
}

export enum HouseElementsTypes{
    CONTAINERS= 'CO',
    EXTERIOR='EX',
    INTERIOR='IN',
    EQUIPAMIENTO='EQ',
    AUTOSUFICIENCIA='AT'
}
