import { AppRoutes, MenuList } from "src/app/shared/model/shared.model";

export const MENU_CONFIG: MenuList[] = [
  { id: 1, order: 1, label: 'Sobre nosotros', route:AppRoutes.ABOUT_US },
  { id: 2, order: 2, label: 'Personaliza', route:AppRoutes.CUSTOMIZATION },
  { id: 3, order: 3, label: 'Contacto', route:AppRoutes.CONTACT },
];
