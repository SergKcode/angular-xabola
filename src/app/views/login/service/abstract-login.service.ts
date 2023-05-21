import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { LoginServiceModule } from './login.service.module';
import { AuthCredential } from '../model/login.model';

@Injectable({
	providedIn: LoginServiceModule,
	useClass: LoginService,
	deps: [HttpClient]
})
export abstract class AbstractLoginService {
	abstract authUser(credetials:AuthCredential):Observable<any>
}
