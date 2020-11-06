import {Component, OnInit} from '@angular/core';

import {User} from '../models';
import {UserService, AuthenticationService} from '../services';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from '../core/api.service';
import {CurrentIssueService} from '../services/currentIssue.service';
import {Issue} from '../models/issue';

@Component({
  templateUrl: 'client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  currentUser: User;
  private openusers: Issue;
  private closedusers: Issue;
  openChats = [this.openusers];
  closedChats = [this.closedusers];

  constructor(
    private userService: UserService,
    public authenticationService: AuthenticationService,
    private apiService: ApiService,
    private http: HttpClient,
    private issueService: CurrentIssueService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  /**
   * Get all the open issues that the current client has
   *
   * @param clientId id of the client
   */
  getAllOpenIssues(clientId) { // retrieve clients and sort by active status
    this.http.get<any>(this.apiService.baseUrl + 'issue/getallopenbyclientid/' + clientId)
      .subscribe((response) => {
        this.openChats = response;
        console.log(response);
      });
  }

  /**
   * Get all the closed issues that the current client has
   *
   * @param clientId id of the client
   */
  getAllClosedIssues(clientId) { // retrieve clients and sort by active status
    this.http.get<any>(this.apiService.baseUrl + 'issue/getallclosedbyclientid/' + clientId)
      .subscribe((response) => {
        this.closedChats = response;
        console.log(response);
      });
  }

  /**
   * Send the id
   *
   * @param item item of the client
   */
  sendId(item: any) {
    this.issueService.changeIssue(item);
  }


  ngOnInit() {
    this.getAllOpenIssues(this.currentUser.idUser);
    this.getAllClosedIssues(this.currentUser.idUser);
  }

  /**
   * Create an issue
   *
   * @param item the issue
   */
  createIssue(item: any) {
    this.issueService.createIssue(item);
  }
}
