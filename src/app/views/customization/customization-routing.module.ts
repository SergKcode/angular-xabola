import { NgModule } from '@angular/core';
import { CustomizationComponent } from './component/customization/customization.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from 'src/app/shared/model/shared.model';

export const routes: Routes = [
  {
    path: '',
    component: CustomizationComponent,
    /* children: [
      {
        path: '',
        redirectTo: AppRoutes.CUSTOMIZATION,
        pathMatch: 'full',
      },
      {
        path: AppRoutes.CUSTOMIZATION,
        loadChildren: () =>
          import('./customization.module').then((m) => m.CustomizationModule),
      },
    ], */
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomizationRoutingModule {}
