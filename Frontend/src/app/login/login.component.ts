import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthenticationService} from '../services';
import {Role} from '../models';
import {first} from 'rxjs/operators';
import {NgFlashMessageService} from 'ng-flash-messages';
import {AlertService} from '../services/alert.service';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
  message: any;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private ngFlashMessageService: NgFlashMessageService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  /**
   * convenience getter for easy access to form fields
   */
  get f() {
    return this.loginForm.controls;
  }

  /**
   * If the user clicks on 'Login', this method will be triggered and
   * checks if the user is an admin, employee or a client.
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(() => {
        switch (this.authenticationService.currentUserValue.roleId) {
          case Role.User: {
            console.log('User');
            this.router.navigate(['/client-dashboard']);
            break;
          }
          case Role.Employee: {
            console.log('Employee');
            this.router.navigate(['/employee-dashboard']);
            break;
          }
          case Role.Admin: {
            console.log('Admin');
            this.router.navigate(['/admin-dashboard']);
            break;
          }
        }
      }, error => {
        this.alertService.advancedErrorMethod(error + ' username or password was incorrect');
        this.loading = false;
      });
  }
}
