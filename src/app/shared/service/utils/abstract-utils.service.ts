import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { UtilsServiceModule } from './utils.service.module';

@Injectable({
	providedIn: UtilsServiceModule,
	useClass: UtilsService,
	deps: []
})
export abstract class AbstractUtilsService {}
