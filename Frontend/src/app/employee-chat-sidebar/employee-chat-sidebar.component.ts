import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../core/api.service';
import {AuthenticationService, CurrentIssueService} from '../services';
import {Issue2} from '../models';

@Component({
  selector: 'app-employee-chat-sidebar',
  templateUrl: './employee-chat-sidebar.component.html',
  styleUrls: ['./employee-chat-sidebar.component.css']
})
export class EmployeeChatSidebarComponent implements OnInit {

  private openusers: Issue2;
  openChats = [this.openusers];
  employeeId = this.auth.currentUserValue.idUser;

  constructor(private http: HttpClient,
              public auth: AuthenticationService,
              private issueService: CurrentIssueService,
              private apiService: ApiService) {
  }

  /**
   * Method to change the current chatsession of the user
   */
  sendId(item: any) {
    this.issueService.changeSession(item);
  }

  /**
   * Method to retrieve all issues with the state "open", which are also linked to the current employee
   */
  getAllOpenIssues(employeeId) { // retrieve clients and sort by active status
    this.http.get<any>(this.apiService.baseUrl + 'issue/getallopenbyemployeeid/' + employeeId)
      .subscribe((response) => {
        this.openChats = response;
        // console.log(response);
      });
  }

  ngOnInit() {
    this.getAllOpenIssues(this.employeeId);
  }
}
