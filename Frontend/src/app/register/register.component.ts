import {Component} from '@angular/core';
import {AuthenticationService} from '../services';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {NgFlashMessageService} from 'ng-flash-messages';
import {ApiService} from '../core/api.service';
import {throwError} from 'rxjs';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
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
    const firstname = ((document.getElementById('firstname') as HTMLInputElement).value);
    const lastname = ((document.getElementById('lastname') as HTMLInputElement).value);
    const email = ((document.getElementById('email') as HTMLInputElement).value);
    const username = ((document.getElementById('username') as HTMLInputElement).value);
    const password = ((document.getElementById('password') as HTMLInputElement).value);
    const repassword = ((document.getElementById('repassword') as HTMLInputElement).value);

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

    // Post the form to the api
    const body =
      'username=' + username +
      '&email=' + email +
      '&password=' + password +
      '&firstname=' + firstname +
      '&lastname=' + lastname;

    this.http.post(this.apiService.baseUrl + 'register/client', body, httpOptions)
      .subscribe((res) => {
          this.succesregister();
        },
        (error) => {
          this.handleError(error);
        });
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

  /**
   * Error handler for all errors
   *
   * @param error show error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      this.ngFlashMessageService.showFlashMessage({
        messages: ['Username already in use.'],

        dismissible: false,

        timeout: 5000,

        type: 'danger'
      }));
  }

  /**
   * When the user is successfully registrered, show a success block.
   * After that, redirect to the login page
   */
  private succesregister() {
    this.ngFlashMessageService.showFlashMessage({
      // Message to show
      messages: ['You have successfully registered. You will be redirected to the log in page'],
      // User can disable the message with a click
      dismissible: true,
      // Time when the message disappears
      timeout: 3000,
      // Type of flash message
      type: 'success'
    });
    setTimeout(() => {
      this.router.navigate(['/login']);

    }, 3000);

  }
}
