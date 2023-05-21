import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './component/layout/layout.component';
import { AppRoutes } from 'src/app/shared/model/shared.model';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: AppRoutes.HOME,
        pathMatch: 'full',
      },
      {
        path: AppRoutes.HOME,
        loadChildren: () =>
          import('../about-us/home.module').then(
            (m) => m.HomeModule
          ),
      },
      {
        path: AppRoutes.CUSTOMIZATION,
        loadChildren: () =>
          import('../customization/customization.module').then(
            (m) => m.CustomizationModule
          ),
      },
      {
        path: AppRoutes.CONTACT,
        loadChildren: () =>
          import('../contact/contact.module').then((m) => m.ContactModule),
      },
      {
        path: AppRoutes.LOGIN,
        loadChildren: () =>
          import('../login/login.module').then((m) => m.LoginModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}

