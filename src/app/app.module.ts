import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { LayoutModule } from './views/layout/layout.module';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './redux/app.reducer';
import { LoginService } from './views/login/service/login.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { LoginServiceModule } from './views/login/service/login.service.module';
import { LoginModule } from './views/login/login.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		LayoutModule,
		StoreModule.forRoot({app:appReducer}),
		EffectsModule.forRoot({}),
		StoreDevtoolsModule.instrument({
			maxAge: 25
		})
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
