import {Component} from '@angular/core';
import {AuthenticationService} from '../services';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgFlashMessageService} from 'ng-flash-messages';
import {ApiService} from '../core/api.service';

@Component({
  selector: 'app-admin-create-employee',
  templateUrl: './admin-create-employee.component.html',
  styleUrls: ['./admin-create-employee.component.css'],
})
export class AdminCreateEmployeeComponent {
  credentials: {
    email: '',
    name: '',
    password: ''
  };

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private http: HttpClient,
    private ngFlashMessageService: NgFlashMessageService,
    private apiService: ApiService
  ) {
  }

  // used the registry method from the backend to add an employee.
  register() {
    // define variables
    let firstname = ((document.getElementById('firstname') as HTMLInputElement).value);
    let lastname = ((document.getElementById('lastname') as HTMLInputElement).value);
    let email = ((document.getElementById('email') as HTMLInputElement).value);
    let username = ((document.getElementById('username') as HTMLInputElement).value);
    let password = ((document.getElementById('password') as HTMLInputElement).value);
    let repassword = ((document.getElementById('repassword') as HTMLInputElement).value);
    let regexpEmail = new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$');

    // role id 2 to create an employee
    const roleId = 2;

    // email check
    if (!this.checkEmail(email)) {
      return null;
    }

    // username check
    if (!this.checkUserName(username)) {
      return null;
    }

    // password check
    if (!this.checkPasswordLengthAndChars(password)) {
      return null;
    }

    // password check
    if (!this.checkPassword(password, repassword)) {
      return null;
    }

    // set headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    const body = 'username=' + username + '&roleId=' + roleId + '&email=' + email +
      '&password=' + password + '&firstname=' + firstname + '&lastname=' + lastname;

    this.http.post(this.apiService.baseUrl + 'register/employee', body, httpOptions)
      .subscribe((data) => {
      });

    this.ngFlashMessageService.showFlashMessage({
      // Message to show
      messages: ['You successfully registered a new employee'],
      // User can disable the message with a click
      dismissible: true,
      // Time when the message disappears
      timeout: 2000,
      // Type of flash message
      type: 'success'
    });

    setTimeout(() => {
        location.reload();
      },
      1500);

  }

  /**
   * Checks if the email that is entered when you register as a client
   * is a valid email address by using a regex.
   *
   * @param email the email of the user
   */
  checkEmail(email): boolean {
    const regexpEmail = new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$');
    if (!regexpEmail.test(email)) {
      this.ngFlashMessageService.showFlashMessage({
        messages: ['This email is not valid.'],

        dismissible: false,

        timeout: 5000,

        type: 'danger'
      });
      return false;
    }
    return true;
  }

  /**
   * When you register as a client, this check comes in place.
   * It has three different aspects to check the username,
   * otherwise registering will fail.
   *
   * @param username username of the client
   */
  checkUserName(username): boolean {
    const regexpUsername = new RegExp('^[a-zA-Z0-9_-]{6,32}$');
    // username has to be between 8 and 32 characters
    if (username.length < 6) {
      this.ngFlashMessageService.showFlashMessage({
        messages: ['The username is too small.'],

        dismissible: false,

        timeout: 5000,

        type: 'danger'

      });
      return false;
    }
    if (username.length > 32) {
      this.ngFlashMessageService.showFlashMessage({
        messages: ['The username is too big.'],

        dismissible: false,

        timeout: 5000,

        type: 'danger'

      });
      return false;
    }
    if (!regexpUsername.test(username)) {
      this.ngFlashMessageService.showFlashMessage({
        messages: ['The username can only contain letters, _ or -.'],

        dismissible: false,

        timeout: 5000,

        type: 'danger'

      });
      return false;
    }
    return true;
  }

  /**
   * When you register as a client, this check comes in place.
   * It the password is shorter or equal than 5 characters,
   * this check will fail.
   *
   * @param password password of the client
   */
  checkPasswordLengthAndChars(password): boolean {
    if (password.length <= 5) {
      this.ngFlashMessageService.showFlashMessage({
        messages: ['The password is too small.'],

        dismissible: false,

        timeout: 5000,

        type: 'danger'

      });
      return false;
    }
    return true;
  }

  /**
   * When you register as a client, this check comes in place.
   * If the password is not the same as the repassword,
   * this check will fail.
   *
   * @param password password of the client
   * @param rePassword re-entered password of the client
   */
  checkPassword(password, rePassword): boolean {

    if (password !== rePassword) {
      this.ngFlashMessageService.showFlashMessage({
        messages: ['The passwords provided do not match.'],

        dismissible: false,

        timeout: 5000,

        type: 'danger'

      });
      return false;
    }
    return true;
  }
}





