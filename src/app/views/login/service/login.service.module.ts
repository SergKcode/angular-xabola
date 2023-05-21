import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

@NgModule({
	imports: [HttpClientModule, StoreModule]
})
export class LoginServiceModule {}
