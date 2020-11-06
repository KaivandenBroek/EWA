import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {ApiService} from '../core/api.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  p = 1;

  // user object
  users: User[];

  constructor(private router: Router, private http: HttpClient, private apiService: ApiService) {
  }

  /**
   * Get all users
   */
  getUsers() {
    return this.http.get<User[]>(this.apiService.baseUrl + 'users/getallemployees');
  }

  ngOnInit() {
    return this.getUsers().subscribe(
      data => this.users = data
    );
  }

  /**
   * If the user click on 'Edit', a new page will open with that employee credentials
   *
   * @param user complete user object
   */
  editUser(user: User): void {
    window.localStorage.removeItem('editEmployeeId');
    window.localStorage.setItem('editEmployeeId', user.idUser.toString());
    this.router.navigate(['admin-edit-employee']);
  }

}
