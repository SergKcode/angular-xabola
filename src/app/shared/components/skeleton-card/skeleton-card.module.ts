import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonCardComponent } from './component/skeleton-card/skeleton-card.component';



@NgModule({
  declarations: [
    SkeletonCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[SkeletonCardComponent]
})
export class SkeletonCardModule { }
