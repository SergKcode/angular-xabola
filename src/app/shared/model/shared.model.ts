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
    ADMIN='admin'
}

export interface GenericObject{
    [key:string]:any
}