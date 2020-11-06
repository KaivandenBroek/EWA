import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public auth: AuthenticationService) {
  }

  ngOnInit() {
  }

}
