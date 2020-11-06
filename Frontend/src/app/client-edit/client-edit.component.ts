import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../models';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from '../core/api.service';
import {AuthenticationService} from '../services';
import {BehaviorSubject, Observable} from 'rxjs';
import {ModalDirective} from 'ngx-bootstrap';
import {NgFlashMessageService} from 'ng-flash-messages';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  constructor(private ngFlashMessageService: NgFlashMessageService,
              private router: Router,
              private http: HttpClient,
              private apiService: ApiService,
              private auth: AuthenticationService) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUserForAdjustment')));
    this.currentUserForAdjustment = this.currentUserSubject.asObservable();
  }

  /**
   * Get current user
   */
  public get currentUserForAdjust(): User {
    return this.currentUserSubject.value;
  }

  @ViewChild(ModalDirective) confirmEdit: ModalDirective;
  @ViewChild(ModalDirective) confirmDelete: ModalDirective;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUserForAdjustment: Observable<User>;
  fieldDisabled = true;
  users: User[];
  display = 'none';

  /**
   * Get all the users
   */
  getUsers() {
    return this.http.get<any>(this.apiService.baseUrl + 'users/getUserForAdjustment/' + this.auth.currentUserValue.idUser)
      .subscribe(data => {
        console.log(data);
        localStorage.setItem('currentUserForAdjustment', JSON.stringify(data));
        this.currentUserSubject.next(data);
      });
  }

  ngOnInit() {
    this.getUsers();
  }

  /**
   * Receive the current user and edit this user
   */
  receiveUserForEdit() {
    const firstName = ((document.getElementById('firstName') as HTMLInputElement).value);
    const lastName = ((document.getElementById('lastName') as HTMLInputElement).value);
    const username = ((document.getElementById('username') as HTMLInputElement).value);
    const email = ((document.getElementById('email') as HTMLInputElement).value);

    if (firstName && lastName && username && email !== null) {
      this.editUser(username, firstName, lastName, email);
    } else {
      console.log('een value is niet gevuld');
    }

  }

  /**
   * Method so that the client can edit his credentials
   *
   * @param username username of the client
   * @param firstName first name of the client
   * @param lastName last name of the client
   * @param email email of the client
   */
  editUser(username, firstName, lastName, email) {
    const body = new URLSearchParams();
    body.set('userId', String(this.currentUserForAdjust.idUser));
    body.set('username', username);
    body.set('firstName', firstName);
    body.set('lastName', lastName);
    body.set('email', email);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    // log out user before subscribe
    this.auth.logout();
    // subscribe
    return this.http.post<any>(this.apiService.baseUrl + 'users/editClient', body.toString(), httpOptions)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/login']);
      });
  }

  /**
   * Method so that the client can delete his information.
   * This method will delete all the information from the database
   * aswell.
   */
  deleteUser(): void {
    this.auth.logout();

    this.apiService.deleteUser(this.auth.currentUserValue.idUser)
      .subscribe(data => {
        this.ngFlashMessageService.showFlashMessage({
          messages: ['Your account has been deleted, good bye :('],

          dismissible: false,

          timeout: 6000,

          type: 'success'
        });
        this.router.navigate(['/']);
      });
  }
}
