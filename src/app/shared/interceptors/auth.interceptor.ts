import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/views/login/service/login.service';
import { AbstractLoginService } from 'src/app/views/login/service/abstract-login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private _loginService: AbstractLoginService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// Obtén el access token de donde lo hayas almacenado en tu aplicación (por ejemplo, localStorage)
		const accessToken = this._loginService.getAccessToken()

		// Clona la solicitud original y agrega el header de Authorization con el access token
		if (accessToken) {
			const authRequest = request.clone({
				headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
			});
			return next.handle(authRequest);
		}

		// Si no hay access token, simplemente pasa la solicitud original sin modificar
		return next.handle(request);
	}
}
