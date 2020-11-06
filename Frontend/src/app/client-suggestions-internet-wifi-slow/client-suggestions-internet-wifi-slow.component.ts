import {Component, OnInit} from '@angular/core';
import {AuthenticationService, TagService} from '../services';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from '../core/api.service';

export interface Modem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-client-suggestions-internet-wifi-slow',
  templateUrl: './client-suggestions-internet-wifi-slow.component.html',
  styleUrls: ['./client-suggestions-internet-wifi-slow.component.css']
})
export class ClientSuggestionsInternetWifiSlowComponent implements OnInit {
  modemId: number;

  constructor(private http: HttpClient,
              private apiService: ApiService,
              private tagService: TagService,
              private auth: AuthenticationService) {
  }

  modems: Modem[];

  ngOnInit() {
    const acc = document.getElementsByClassName('accordion');

    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function() {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.display === 'block') {
          panel.style.display = 'none';
        } else {
          panel.style.display = 'block';
        }
      });
    }

    this.apiService.getAllModems().subscribe(
      data => this.modems = data
    );
  }

  public tagToTagService() {
    this.tagService.getAllTagsAndSessionId();
  }

  selectChangeHandler(event: any) {
    this.modemId = event.target.value;
    this.createModemForUser(this.modemId);
  }

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
