import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService, TagService} from './services';
import {Role, User} from './models';

import {WebsocketService} from './services/websocket.service';
import {ChatService} from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [WebsocketService, ChatService, TagService]
})
export class AppComponent {

  constructor(
    private router: Router,
    public auth: AuthenticationService
  ) {
    this.auth.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.roleId === Role.Admin;
  }

  get isEmployee() {
    return this.currentUser && this.currentUser.roleId === Role.Employee;
  }

  currentUser: User;

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
