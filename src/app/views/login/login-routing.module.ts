import { AppRoutes } from 'src/app/shared/model/shared.model';
import { LoginComponent } from './component/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
      path: '',
      component: LoginComponent,
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class LoginRoutingModule {}
  