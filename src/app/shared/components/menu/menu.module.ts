import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './component/menu.component';
import { Store, StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    StoreModule
  ],
  exports:[MenuComponent]
})
export class MenuModule { }
