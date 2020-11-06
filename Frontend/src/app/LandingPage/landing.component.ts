import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services';

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']

})
export class LandingComponent implements OnInit {

  constructor(public auth: AuthenticationService) {
  }

  ngOnInit() {
  }

}
