import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {ApiService} from '../core/api.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  p: number = 1;

  // user object
  users: User[];

  constructor(private router: Router, private http: HttpClient, private apiService: ApiService) {
  }

  /**
   * Get all users
   */
  getUsers() {
    return this.http.get<User[]>(this.apiService.baseUrl + 'users/clients');
  }

  ngOnInit() {
    return this.getUsers().subscribe(
      data => this.users = data
    );
  }

  /**
   * If you press the 'Edit' button, you will go to that client
   *
   * @param user complete user object
   */
  editUser(user: User): void {
    window.localStorage.removeItem('editUserId');
    window.localStorage.setItem('editUserId', user.idUser.toString());
    this.router.navigate(['edit-client']);
  };

  /**
   * This method will delete all the information from the database of the client
   *
   * @param user complete user object
   */
  deleteUser(user: User): void {
    if (confirm('Are you sure you want to delete user ' + user.firstName)) {
      this.apiService.deleteUser(user.idUser)
        .subscribe(data => {
          this.users = this.users.filter(u => u !== user);
        });
    }
  }

}
