import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './component/layout/layout.component';
import { MenuModule } from 'src/app/shared/components/menu/menu.module';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';
import { LayoutRoutingModule } from './layout-routing.module';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MenuModule,
    FooterModule
  ],
  exports:[LayoutComponent]
})
export class LayoutModule { }