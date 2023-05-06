import { Injectable } from '@angular/core';
import { CustomizationService } from './customization.service';
import { CustomizationServiceModule } from './customization.service.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: CustomizationServiceModule,
	useClass: CustomizationService,
	deps: [HttpClient]
})
export abstract class AbstractCustomizationService {
	abstract getAllModules(): Observable<any>;
	abstract getModule(id: number): Observable<any>;
	abstract getExtra(id: number): Observable<any>;
	abstract getAllExtras(): Observable<any>;
	abstract getExtrasByType(type: string): Observable<any>;
}
