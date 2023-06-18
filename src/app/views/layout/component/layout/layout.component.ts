import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { getProductTypes, saveCurrentRoute } from 'src/app/redux/app.action';
import { AppRoutes } from 'src/app/shared/model/shared.model';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
	isAdminView$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private _router: Router, private _store: Store) {}

	ngOnInit(): void {
		//dispatch para almacenar en los estados de redux los tipos de producto disponibles
		this._store.dispatch(getProductTypes());
		this.isAdminView$.next(this._router.url === `/${AppRoutes.ADMIN}`);
		this._router.events.pipe().subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this._store.dispatch(saveCurrentRoute({ route: event.url }));
			}
		});
	}
}
