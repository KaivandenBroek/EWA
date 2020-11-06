import {Component, OnInit} from '@angular/core';
import {User} from '../models';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from '../core/api.service';
import {AuthenticationService} from '../services';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-admin-edit-employee',
  templateUrl: './admin-edit-employee.component.html',
  styleUrls: ['./admin-edit-employee.component.css']
})
export class AdminEditEmployeeComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private apiService: ApiService, private auth: AuthenticationService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUserForAdjustment')));
    this.currentUserForAdjustment = this.currentUserSubject.asObservable();
  }

  /**
   * Get the current user
   */
  public get currentUserForAdjust(): User {
    return this.currentUserSubject.value;
  }

  private currentUserSubject: BehaviorSubject<User>;
  public currentUserForAdjustment: Observable<User>;
  fieldDisabled = false;
  users: User[];
  display = 'none';
  employeeId: string;

  /**
   * Receive all users from backend
   */
  getUsers() {
    return this.http.get<any>(this.apiService.baseUrl + 'users/getUserForAdjustment/' + localStorage.getItem('editEmployeeId'))
      .subscribe(data => {
        console.log(data);
        localStorage.setItem('currentUserForAdjustment', JSON.stringify(data));
        this.currentUserSubject.next(data);
      });
  }

  ngOnInit() {
    this.getUsers();
    this.employeeId = localStorage.getItem('editEmployeeId');
  }

  /**
   * Receive the current employee to edit
   */
  receiveUserForEdit() {
    const firstName = ((document.getElementById('firstName') as HTMLInputElement).value);
    const lastName = ((document.getElementById('lastName') as HTMLInputElement).value);
    const username = ((document.getElementById('username') as HTMLInputElement).value);
    const email = ((document.getElementById('email') as HTMLInputElement).value);

    if (firstName && lastName && username && email !== null) {
      this.editUser(username, firstName, lastName, email);
    } else {
      console.log('Not all values has been filled.');
    }

  }

  /**
   * Method to edit the current employee you have selected
   *
   * @param username username of the employee
   * @param firstName first name of the employee
   * @param lastName last name of the employee
   * @param email email of the employee
   */
  editUser(username, firstName, lastName, email) {
    const body = new URLSearchParams();
    body.set('userId', this.employeeId);
    body.set('username', username);
    body.set('firstName', firstName);
    body.set('lastName', lastName);
    body.set('email', email);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post<any>(this.apiService.baseUrl + 'users/editClient', body.toString(), httpOptions)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/employees']);
      });
  }

}



