import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { LayoutModule } from './views/layout/layout.module';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './redux/app.reducer';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		LayoutModule,
		StoreModule.forRoot({app:appReducer}),
		EffectsModule.forRoot({}),
		StoreDevtoolsModule.instrument({
			maxAge: 25
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
