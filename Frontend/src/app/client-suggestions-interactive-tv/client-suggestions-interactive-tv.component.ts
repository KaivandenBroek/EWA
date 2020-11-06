import {Component, OnInit} from '@angular/core';
import {NgFlashMessageService} from 'ng-flash-messages';
import {Router} from '@angular/router';
import {AuthenticationService, TagService} from '../services';

@Component({
  selector: 'app-client-suggestions-interactive-tv',
  templateUrl: './client-suggestions-interactive-tv.component.html',
  styleUrls: ['./client-suggestions-interactive-tv.component.css']
})
export class ClientSuggestionsInteractiveTvComponent implements OnInit {
  TV = 2;
  TVMALFUNCTION = 21;
  TVINSTALL = 22;
  TVMALFUNCTIONUPGRADE = 211;
  TVINSTALLUPGRADE = 212;

  constructor(private ngFlashMessageService: NgFlashMessageService,
              private router: Router,
              private auth: AuthenticationService,
              private tagService: TagService) {
  }


  ngOnInit() {
  }

  /**
   * This method will redirect you to the Client chat
   * @constructor
   */
  Malfunction() {
    this.tagService.methodForExtraFunctions(this.TV, this.TVMALFUNCTION, this.TVMALFUNCTIONUPGRADE);

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

  /**
   * This method will redirect you to the Client chat
   * @constructor
   */
  Installation() {
    this.tagService.methodForExtraFunctions(this.TV, this.TVINSTALL, this.TVINSTALLUPGRADE);

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
