import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiService} from '../core/api.service';

import {User} from '../models';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  // create behavior subject User
  private currentUserSubject: BehaviorSubject<User>;
  // create observable User
  public currentUser: Observable<User>;

  /**
   * constructor
   * @param http get service from import
   * @param apiService get service from import
   */
  constructor(private http: HttpClient, private apiService: ApiService) {
    // get localstorage item and store in behavior subject
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // read behavior subject as observable
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * method to get current user value from User object
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * method to login a user with backend call
   * @param username received in post
   * @param password received in post
   */
  login(username: string, password: string) {
    // create a const body
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    // create header options
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    // return a user after the post call is a succes
    return this.http.post<any>(this.apiService.baseUrl + 'login', body.toString(), httpOptions)
      .pipe(map(user => {
        // if user and jwttoken are present store user in local storage
        if (user && user.jwtToken) {
          // set local storage item
          localStorage.setItem('currentUser', JSON.stringify(user));
          // next new behavior subject
          this.currentUserSubject.next(user);
        }
        // return user
        return user;
      }));
  }

  /**
   * method to logout a user
   */
  logout() {
    // if user value is null return null and remove current user
    if (this.currentUserValue === null) {
      // remove item
      localStorage.removeItem('currentUser');
      return null;
    } else {
      // define a body
      const body = new URLSearchParams();
      body.set('username', this.currentUserValue.username);
      // create http options
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };
      // return the post value
      return this.http.post<any>(this.apiService.baseUrl + 'logout', body.toString(), httpOptions)
        .subscribe(data => {
          // remove user from local storage
          localStorage.removeItem('currentUser');
          // set subject null
          this.currentUserSubject.next(null);
        });
    }
  }
}
