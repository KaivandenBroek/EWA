import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {NgFlashMessageService} from 'ng-flash-messages';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private ngFlashMessageService: NgFlashMessageService) {
  }

  ngOnInit() {
    localStorage.removeItem('currentAlert');
  }

  /**
   * Global function for throwing errors
   *
   * @param type type of the error
   * @param message message that is in the alert box
   */
  throwErrorMessage(type, message) {

    this.ngFlashMessageService.showFlashMessage({
      messages: [message],

      dismissible: false,

      timeout: 5000,

      type

    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
