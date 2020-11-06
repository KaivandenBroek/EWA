//  Imports
import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../services';
import {ApiService} from '../core/api.service';
import {Router} from '@angular/router';
import {CurrentIssueService} from '../services';
import {Issue} from '../models';

//  Components
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  /**
   * Contructor with the parameters
   * @param http
   * @param apiService
   * @param auth
   * @param issueService
   * @param router
   */
  constructor(private http: HttpClient,
              private apiService: ApiService,
              public auth: AuthenticationService,
              private issueService: CurrentIssueService,
              private router: Router) {
  }

  // declarations and type definitions
  private newusers: Issue;
  private openusers: Issue;
  private closedusers: Issue;
  private issuebyspecifictag: Issue; // filtered issue
  tags: object = [''];
  newChats = [this.newusers];
  openChats = [this.openusers];
  closedChats = [this.closedusers];
  employeeId = this.auth.currentUserValue.idUser;
  specificIssues = [this.issuebyspecifictag]; // Array of filtered issues
  selectedTag: string; // selected tag

  /**
   * Calls the API to get all the new issues(Chats) from the employee.
   */
  getAllNewIssues() { // retrieve clients and sort by active status
    this.http.get<any>(this.apiService.baseUrl + 'issue/getallnew')
      .subscribe((response) => {
        this.newChats = response;
        console.log(response);
      });
  }

  /**
   * Calls the API to get all the open issues(Chats) from the employee.
   */
  getAllOpenIssues(employeeId) { // retrieve clients and sort by active status
    this.http.get<any>(this.apiService.baseUrl + 'issue/getallopenbyemployeeid/' + employeeId)
      .subscribe((response) => {
        this.openChats = response;
        console.log(response);
      });
  }

  /**
   * Calls the API to get all the closed issues(Chats) from the employee.
   */
  getAllClosedIssues() { // retrieve clients and sort by active status
    this.http.get<any>(this.apiService.baseUrl + 'issue/getallclosed')
      .subscribe((response) => {
        this.closedChats = response;
        console.log(response);
      });
  }

  /**
   * This method retrives al the tags from the data base with a get call.
   */
  getAllTags() {  // retrieve all tags
    return this.http.get(this.apiService.baseUrl + 'tags/getalltags')
      .subscribe(response => {
        this.tags = response;
        console.log(response);
      });
  }


  /**
   * This method returns a issue filtered by a specifc tagname
   * @param tagnaam
   */
  getIssueBySpecificTag(tagnaam) {

    // refreshes filtered issues
    this.getAllNewIssues();
    this.getAllOpenIssues(this.employeeId);
    this.getAllClosedIssues();

    // Checks if the tagname was already selected, and if it is, don't filter
    if (this.selectedTag === tagnaam) {
      this.selectedTag = '';
      return;
    }

    this.selectedTag = tagnaam; // sets the selected tagname

    /**
     * Calls the API to get all the issues(Chats) from the specific tagname.
     * Using the sessionIDs of the issues, it then filters the new, closed & open chats.
     */
    this.http.get<any>(this.apiService.baseUrl + 'tags/getissuebyspecifictag/' + tagnaam)
      .subscribe(response => {
        this.specificIssues = response;
        // If no issues are found, the chat arrays are emptied
        if (this.specificIssues) {
          const sessionIds = this.specificIssues.map(i => i.sessionId);
          console.log(sessionIds);
          this.newChats = this.newChats.filter(chat => sessionIds.includes(chat.sessionId));
          this.closedChats = this.closedChats.filter(chat => sessionIds.includes(chat.sessionId));
          this.openChats = this.openChats.filter(chat => sessionIds.includes(chat.sessionId));
        } else {
          this.newChats = [];
          this.closedChats = [];
          this.openChats = [];
        }
      });
  }

  /**
   *
   * @param item
   */
  displayPermission(item: any) {
    this.connectToIssue(item, this.auth.currentUserValue.idUser);
    this.issueService.changeSession(item);
  }

  /**
   *
   * @param item
   */
  sendId(item: any) {
    this.issueService.changeSession(item);
  }

  /**
   *
   * @param issueId
   * @param employeeId
   */
  connectToIssue(issueId, employeeId) {
    const body = new URLSearchParams();
    body.set('issueId', issueId);
    body.set('employeeId', employeeId);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post<any>(this.apiService.baseUrl + 'issue/addemployeetoissue', body.toString(), httpOptions)
      .subscribe(data => {
        this.router.navigate(['/employee-chat']);
      });
  }

  /**
   * Fills dashboard with data when page opens
   */
  ngOnInit() {
    this.getAllNewIssues();
    this.getAllOpenIssues(this.employeeId);
    this.getAllClosedIssues();
    this.getAllTags();
    this.selectedTag = '';
    console.log('CURRENT ISSUE: ' + this.issueService.currentIssueValue);
  }
}
