import {Component, OnInit} from '@angular/core';
import {AuthenticationService, TagService} from '../services';
import {ApiService} from '../core/api.service';
import {Modem} from '../models';
import {HttpClient, HttpHeaders} from '@angular/common/http';

export interface Modem {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-client-suggestions-internet-cable-slow',
  templateUrl: './client-suggestions-internet-cable-slow.component.html',
  styleUrls: ['./client-suggestions-internet-cable-slow.component.css']
})

export class ClientSuggestionsInternetCableSlowComponent implements OnInit {
  modemId: number;

  // Array of modems
  modems: Modem[];

  /**
   * Contructor
   * @param http
   * @param tagService
   * @param apiService
   * @param auth
   */
  constructor(private http: HttpClient, private tagService: TagService, private apiService: ApiService, private auth: AuthenticationService) {
  }

  ngOnInit() {

    // JS-code for checklist
    var acc = document.getElementsByClassName('accordion');
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function() {
        this.classList.toggle('active');
        var panel = this.nextElementSibling;
        if (panel.style.display === 'block') {
          panel.style.display = 'none';
        } else {
          panel.style.display = 'block';
        }
      });
    }

    /**
     * Gets al the modems from the database
     */
    this.apiService.getAllModems().subscribe(
      data => this.modems = data
    );


  }

  /**
   * This method gets all tags and sessionId's
   */
  public tagToTagService() {
    this.tagService.getAllTagsAndSessionId();
  }

  /**
   * selectChangeHandler method for selecting different modems.
   * @param event
   */
  selectChangeHandler(event: any) {
    this.modemId = event.target.value;
    this.createModemForUser(this.modemId);
  }

  /**
   * This method creates a modem for a User
   * @param item
   */
  createModemForUser(item) {
    const body = new URLSearchParams();
    body.set('username', this.auth.currentUserValue.username);
    body.set('modemId', String(item));

    console.log(body.toString());

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post<any>(this.apiService.baseUrl + 'modem/addModemToUser', body.toString(), httpOptions).subscribe(data => {
        console.log(data);
      }
    );

  }
}
