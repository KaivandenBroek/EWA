import {Component, OnInit} from '@angular/core';
import {NgFlashMessageService} from 'ng-flash-messages';
import {Router} from '@angular/router';
import {AuthenticationService, TagService} from '../services';

@Component({
  selector: 'app-client-suggestions-telephony',
  templateUrl: './client-suggestions-telephony.component.html',
  styleUrls: ['./client-suggestions-telephony.component.css']
})
export class ClientSuggestionsTelephonyComponent implements OnInit {
  TELEPHONE = 3;
  TELEPHONEMALFUNCTION = 31;
  TELEPHONEMALFUNCTIONUPGRADE = 311;
  TELEPHONEINSTALL = 32;
  TELEPHONEINSTALLUPGRADE = 312;


  constructor(private ngFlashMessageService: NgFlashMessageService,
              private router: Router,
              private auth: AuthenticationService,
              private tagService: TagService) {
  }

  ngOnInit() {
  }

  Malfunction() {
    this.tagService.methodForExtraFunctions(this.TELEPHONE, this.TELEPHONEMALFUNCTION, this.TELEPHONEMALFUNCTIONUPGRADE);

    this.ngFlashMessageService.showFlashMessage({
      // Message to show
      messages: ['Dear ' + this.auth.currentUserValue.username + ' We are very sorry but currently this function is not yet ' +
      'completely supported. However you will be redirected to a chat with one of our employees within six seconds'],
      // User can disable the message with a click
      dismissible: true,
      // Time when the message disappears
      timeout: 6000,
      // Type of flash message
      type: 'danger'
    });
    setTimeout(() => {
      this.router.navigate(['/client-chat']);

    }, 6000);
  }

  Installation() {
    this.tagService.methodForExtraFunctions(this.TELEPHONE, this.TELEPHONEINSTALL, this.TELEPHONEINSTALLUPGRADE);

    this.ngFlashMessageService.showFlashMessage({
      // Message to show
      messages: ['Dear ' + this.auth.currentUserValue.username + ' We are very sorry but currently this function is not yet ' +
      'completely supported However you will be redirected to a chat with one of our employees within six seconds'],
      // User can disable the message with a click
      dismissible: true,
      // Time when the message disappears
      timeout: 6000,
      // Type of flash message
      type: 'danger'
    });
    setTimeout(() => {
      this.router.navigate(['/client-chat']);

    }, 6000);

  }

}
