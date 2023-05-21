import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, first, of } from 'rxjs';
import { AppRoutes, MenuList } from 'src/app/shared/model/shared.model';
import { MENU_CONFIG } from '../model/menu.config';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentRoute } from 'src/app/redux/app.selector';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	tabList$: Observable<MenuList[]> = of([]);
	isHomePage$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

	constructor(private _router: Router, private _store: Store) {}

	ngOnInit(): void {
		this.tabList$ = this._getTabsMenu();
		this.isHomePage$.next(this._router.url === `/${AppRoutes.HOME}`);
		this._store
			.select(selectCurrentRoute)
			.pipe(distinctUntilChanged((prev, curr) =>  {
				return prev===curr
			}))
			.subscribe((route) => {
				const currentRoute = route ? route : this._router.url;
				this.isHomePage$.next(currentRoute === '/' || currentRoute === '/' + AppRoutes.HOME);
			});
	}

	private _getTabsMenu(): Observable<MenuList[]> {
		return of(MENU_CONFIG);
	}

	goToLoginPage() {
		this._router.navigate([`/${AppRoutes.LOGIN}`]);
	}

	navigateTo(tab: MenuList) {
		this._router.navigate([`/${tab.route}`]);
	}
}
