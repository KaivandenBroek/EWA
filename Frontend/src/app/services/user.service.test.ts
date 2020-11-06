import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '../models';
import {Issue} from '../models/issue';

@Injectable({providedIn: 'root'})
export class UserService {
  /**
   * constructor
   * @param http received from import
   */
  constructor(private http: HttpClient) {
  }

  /**
   * method to get all users
   */
  getAll() {
    return this.http.get<User[]>(`http://localhost:8080/ziggo-application-1.0-SNAPSHOT/api/users/all`);
  }

  /**
   * method to get all active employees
   */
  getAllActiveEmployees() {
    return this.http.get<User[]>('http://localhost:8080/ziggo-application-1.0-SNAPSHOT/api/users/allActiveEmployees');
  }

  /**
   * method to get all active clients
   */
  getAllActiveClients() {
    return this.http.get<User[]>('http://localhost:8080/ziggo-application-1.0-SNAPSHOT/api/users/allActiveClients');
  }

  /**
   * method to get user by id
   * @param id received in method call
   */
  getById(id: number) {
    return this.http.get<User>(`http://localhost:8080/ziggo-application-1.0-SNAPSHOT/api/users/${id}`);
  }

  /**
   * method to get issue by employee id
   * @param id received from method call
   */
  getIssueEmployeeId(id: number) {
    return this.http.get<Issue[]>('http://localhost:8080/ziggo-application-1.0-SNAPSHOT/api/issue/employeeid/${id}');
  }

  /**
   * method to get all issues from backend
   */
  getAllIssues() {
    return this.http.get<User[]>('http://localhost:8080/ziggo-application-1.0-SNAPSHOT/api/issue/all');
  }
}
