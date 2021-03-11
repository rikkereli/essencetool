import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SessionService  {
  showSpinner: boolean = false;

  menus = {
    main: []
  }
  constructor() { }

  setMenu(menuName: string, menu: any[]) {
    this.menus[menuName] = menu
  }

  menuItemSelected(menuName: string, item: any) {
    let menu = this.menus[menuName]
    menu.forEach(item => item.isActive = false)
    item.isActive = true;
  }
}

