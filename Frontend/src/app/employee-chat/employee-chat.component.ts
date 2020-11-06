import {Component, OnInit} from '@angular/core';
import {ChatService} from '../services/chat.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from '../core/api.service';
import {AuthenticationService} from '../services';
import {CurrentIssueService} from '../services';
import {IssueComplete} from '../models';
import {Modem} from '../models';
import {BehaviorSubject, Observable} from 'rxjs';
import {Tag} from '../models';
import {Content} from '../models';

@Component({
  selector: 'app-employee-chat',
  templateUrl: './employee-chat.component.html',
  styleUrls: ['./employee-chat.component.css'],
})
export class EmployeeChatComponent implements OnInit {
  private totalMessage: string;
  private currentModemSubject: BehaviorSubject<Modem>;
  public currentModem: Observable<Modem>;

  constructor(
    private authenticationService: AuthenticationService,
    private chatService: ChatService,
    private http: HttpClient,
    private apiService: ApiService,
    private issueService: CurrentIssueService
  ) {
    this.currentModemSubject = new BehaviorSubject<Modem>(JSON.parse(localStorage.getItem('currentModem')));
    this.currentModem = this.currentModemSubject.asObservable();

    /**
     * These lines of code are called whenever a message arrives at the server in the backend
     * It filters the message to the current issue and users, so that there are no double messages and individual users lined to one chat
     */
    chatService.messages.subscribe(msg => {                         // stuff i do with incomming message

      // if (this.issue != null) {
      console.log(msg.receiver);                                      // testing message clientname
      console.log(this.issue[0].username + ': ');                     // testing issue clientname
      console.log(msg.receiver === this.issue[0].username + ': ');    // testing verification
      if (msg.receiver === this.issue[0].username + ': ') {           // only see message if message is from client
        this.messagesArray.push(msg.time.toString() + msg.receiver.toString() + msg.message.toString());
        this.messageArea = this.messagesArray.toString();  // SHOULD FILL OTHER TEXTAREA WITH LIST
      }
      // }
    });
  }

  /**
   * A lot of variables, arrays and objects that contribute in this large class
   */
  private selectedusername: number; // user for getModem
  private selectedId: string;
  private selectedStatus: any;
  public messagesArray = [];
  private issueFormat: IssueComplete;
  private tagFormat: Tag;
  private modemFormat: Modem;
  private contentFormat: Content;
  content = [this.contentFormat];
  issue = [this.issueFormat];
  tags = [this.tagFormat];
  modem = this.modemFormat;
  itemList: { modem: string; userId: string; username: string }[];
  status = 4;
  issueId = this.issueService.callvalue();
  getDatum: string;
  showstatus = '';
  date = EmployeeChatComponent.getDate();
  time = EmployeeChatComponent.getTime();
  messageArea: string; // html textArea
  value: string; // input message
  private messageText = {
    author: this.authenticationService.currentUserValue.username + ': ',
    receiver: this.authenticationService.currentUserValue.username + ': ',
    message: 'NOTHING YET',
    time: this.time
  };

  /**
   * Get current hours and minutes
   */
  static getTime() {
    const now = new Date();
    return now.getHours() + ':' + now.getMinutes() + ' ';
  }

  /**
   * Get current year, month and day
   */
  static getDate() {
    const now = new Date();
    return now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate();
  }

  public get currentModemValue(): Modem {
    return this.currentModemSubject.value;
  }

  /**
   * Method to check if the current status of the issue is anything other than open
   */
  static checkStatus(status) {
    if (status === 4) {
      return 'NEW';
    } else if (status === 2) {
      return 'CLOSED';
    } else {
      return '';
    }
  }

  /**
   * Method to receive all data from the current issue.
   */
  getCurrentIssue() { // return current issue
    const issueId = this.issueService.callvalue();
    return this.http.get<any>(this.apiService.baseUrl + 'issue/issuebyidcomplete/' + issueId)
      .subscribe(response => {
        console.log(response);
        this.issue = response;
        this.getDatum = response.map(({date}) => date);
        this.selectedusername = response.map(({username}) => username);
        this.selectedId = response.map(({idUser}) => idUser);
        this.selectedStatus = response.map(({idStatus}) => idStatus);
        this.getModem(this.selectedusername);
        setTimeout(() => {
            this.getAllItems(this.selectedusername, this.selectedId);
          },
          2000);
        if (this.messagesArray.length < 1) {
          this.showstatus = EmployeeChatComponent.checkStatus(this.selectedStatus);
        }
      });
  }

  /**
   * Method to retrieve all tags for the current issue
   */
  getAllTags() {  // retrieve all tags from the issue
    const issueId = this.issueService.callvalue();
    return this.http.get<any>(this.apiService.baseUrl + 'tags/gettagsforissue/' + issueId)
      .subscribe(response => {
        console.log(response);
        this.tags = response;
      });
  }

  /**
   * Method to retrieve the modem for the current issue
   */
  getModem(username) { // retrieve modem chose by user
    localStorage.removeItem('currentModem');
    return this.http.get<any>(this.apiService.baseUrl + 'modem/getModemForUser/' + username)
      .subscribe(response => {
        console.log(response);
        localStorage.removeItem('currentModem');
        localStorage.setItem('currentModem', JSON.stringify(response));
      });
  }

  /**
   * Method to retrieve all data from the client for the current issue
   */
  getAllItems(username, userId) { // retrieve data from te user
    this.itemList = [{
      username: 'Username: ' + username,
      userId: 'ID user: ' + userId,
      modem: 'Modem: ' + this.currentModemValue.modemNaam
    }];
  }

  /**
   * Method to receive all chat history if exists
   */
  chatHistoryFunction() {
    // retrieve session
    const issueId = this.issueService.callvalue();
    // session.getHistory
    return this.http.get<any>(this.apiService.baseUrl + 'issue/chathistorybyid/' + issueId)
      .subscribe(response => {
        this.content = response;

        this.content.forEach(messages => {
          this.messagesArray.push(messages.linetext);
        });
      });
  }

  /**
   * Method to send a message to the backend, so that the server can broadcast it
   * Also the message is put in an array that displays messages in both the client and employee chatroom
   */t;

  sendMessage() {
    this.messageText.time = EmployeeChatComponent.getTime();
    this.messageText.message = this.value;
    this.totalMessage = (this.messageText.time + this.messageText.author + this.messageText.message);
    console.log('new message from client to websocket: ', this.totalMessage); // log message
    this.chatService.messages.next(this.messageText);
    this.messagesArray.push(this.totalMessage);             // SHUOLD FILL ARRAY
    this.messageArea = this.messagesArray.toString();       // SHOULD FILL TEXTAREA WITH LIST
    this.messageToDatabase(this.totalMessage);              // SHOULD SEND MESSAGE TO DATABASE
    this.value = '';
  }

  /**
   * Method to put the message in the database, called whenever a message is sent
   */
  messageToDatabase(message: string) {

    const issueId = this.issueService.callvalue();
    const body = new URLSearchParams();
    body.set('sessionId', issueId.toString());
    body.set('linetext', message);

    // set headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post(this.apiService.baseUrl + 'issue/putmessage', body.toString(), httpOptions)
      .subscribe(data => {
      });
  }

  /**
   * Method to change the state of the current issue, so that the employee knows the issue is solved
   */
  markSolved() {
    const issueId = this.issueService.callvalue();
    const body = new URLSearchParams();
    body.set('sessionId', issueId.toString());
    console.log(issueId);

    // set headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    this.http.post(this.apiService.baseUrl + 'issue/issuesolved', body.toString(), httpOptions)
      .subscribe((data) => {
      });
  }

  /**
   * Method to distinct messages from the sender
   */
  private checkMessageOrigin(origin: string) {
    return origin.search(this.authenticationService.currentUserValue.username) === -1;
  }

  ngOnInit(): void {
    this.chatHistoryFunction();
    console.log(this.issueService.callvalue());
    this.getCurrentIssue();
    this.getAllTags();
  }
}
