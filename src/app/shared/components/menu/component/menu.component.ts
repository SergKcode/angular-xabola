import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MenuList } from 'src/app/shared/model/shared.model';
import { MENU_CONFIG } from '../model/menu.config';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  tabList$: Observable<MenuList[]>=of([])

  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];


  constructor() { }

  ngOnInit(): void {
    this.tabList$= this._getTabsMenu()
  }

  private _getTabsMenu():Observable<MenuList[]>{
    return of(MENU_CONFIG)

  }
  

}
