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
        redirectTo: AppRoutes.ABOUT_US,
        pathMatch: 'full',
      },
      {
        path: AppRoutes.ABOUT_US,
        loadChildren: () =>
          import('../about-us/about-us.module').then(
            (m) => m.AboutUsModule
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
        path: AppRoutes.ADMIN,
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

