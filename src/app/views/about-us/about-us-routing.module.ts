import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './component/about-us/about-us.component';

const routes: Routes = [
  {
    path: '',
    component: AboutUsComponent,
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
  exports: [RouterModule],
})
export class AboutUsRoutingModule {}
