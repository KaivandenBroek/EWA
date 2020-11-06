import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/scan';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ChatService} from '../../services/chat.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService, CurrentIssueService} from '../../services';
import {ApiService} from '../../core/api.service';
import {IssueComplete} from '../../models/issueComplete';
import {Content} from '../../models/Content';
import {Tag} from '../../models';
import {Modem} from '../../models/modem';
import {BehaviorSubject, Observable} from 'rxjs';
import {MessageText} from '../../models/messageText';

@Component({
  selector: 'app-client-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {
  private totalMessage: string;
  private currentRate: any;
  private selectedTag1: any;
  private selectedTag2: any;
  private selectedTag3: any;
  private currentModemSubject: BehaviorSubject<Modem>;
  public currentModem: Observable<Modem>;
  private SelectedEmployeename: any;
  private selectedusername: any;
  private selectedModem: any;

  constructor(
    private modal: NgbModal,
    private http: HttpClient,
    private chatService: ChatService,
    private authenticationService: AuthenticationService,
    private issueService: CurrentIssueService,
    private apiService: ApiService,
    private auth: AuthenticationService
  ) {
    this.currentModemSubject = new BehaviorSubject<Modem>(JSON.parse(localStorage.getItem('currentModem')));
    this.currentModem = this.currentModemSubject.asObservable();

    /**
     * These lines of code are called whenever a message arrives at the server in the backend
     * It filters the message to the current issue and users, so that there are no double messages and individual users lined to one chat
     */
    chatService.messages.subscribe(msg => {
      this.getCurrentIssue();
      if (this.issue[0] === undefined) {
        setTimeout(() => {
            ChatDialogComponent.refresh();
          },
          1000);
      } else {
        console.log(msg.author);
        console.log(msg.receiver);                                           // testing message clientname
        console.log(this.issue[0].employeename + ': ');                     // testing issue clientname
        console.log(msg.receiver === this.issue[0].employeename + ': ');    // testing verification
        if (msg.receiver === this.issue[0].employeename + ': ') {           // only see message if message is from client
          this.messagesArray.push(msg.time.toString() + msg.receiver.toString() + msg.message.toString());
          this.messageArea = this.messagesArray.toString();  // SHOULD FILL OTHER TEXTAREA WITH LIST
        }
      }
    });
  }

  /**
   * A lot of variables, arrays and objects that contribute in this large class
   */
  private selectedStatus: any;
  private modemFormat: Modem;
  private issueFormat: IssueComplete;
  private contentFormat: Content;
  private tagFormat: Tag;
  public messagesArray = [];
  fieldDisabled = false;
  modem = this.modemFormat;
  issue = [this.issueFormat];
  tags = [this.tagFormat];
  content = [this.contentFormat];
  time = ChatDialogComponent.getTime();
  messageArea: string; // html textArea
  value: string; // input message
  private messageText: MessageText = {
    author: this.authenticationService.currentUserValue.username + ': ',
    receiver: this.authenticationService.currentUserValue.username + ': ',
    message: '',
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

  /**
   * Refresh the page if this method is invoked
   */
  static refresh(): void {
    window.location.reload();
  }

  /**
   * Get the current id of the selected modem
   */
  public get currentModemValue(): Modem {
    return this.currentModemSubject.value;
  }

  /**
   * Method to send a message to the backend, so that the server can broadcast it
   * Also the message is put in an array that displays messages in both the client and employee chatroom
   */
  sendMessage() {
    this.getCurrentIssue();
    this.messageText.time = ChatDialogComponent.getTime();
    this.messageText.message = this.value;
    this.totalMessage = (this.messageText.time + this.messageText.author + this.messageText.message);
    console.log('new message from client to websocket: ', this.totalMessage); // log message
    this.chatService.messages.next(this.messageText);
    this.messagesArray.push(this.totalMessage); // fill array
    this.messageArea = this.messagesArray.toString();  // SHOULD FILL TEXTAREA WITH LIST
    this.messageToDatabase(this.totalMessage);
    this.value = '';
  }

  /**
   * Method to receive all data from the current issue.
   */
  getCurrentIssue() { // return current issue
    const issueId = this.issueService.currentIssueValue;
    // console.log('CURRENT SESSION = ' + issueId);
    return this.http.get<any>(this.apiService.baseUrl + 'issue/issuebyidcomplete/' + issueId)
      .subscribe(response => {
        this.issue = response.valueOf();
        this.SelectedEmployeename = response.map(({employeename}) => employeename);
        this.selectedusername = response.map(({username}) => username);
        // console.log(response);
      });
  }

  /**
   * Method to put the message in the database, called whenever a message is sent
   */
  messageToDatabase(message: string) {

    const issueId = this.issueService.currentIssueValue;
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
   * Method to push a new score to the current employee
   */
  getScore(currentRate) {
    const body = new URLSearchParams();
    body.set('issue', String(this.issueService.currentIssueValue));
    body.set('score', String(currentRate));

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post(this.apiService.baseUrl + 'score/testscore', body.toString(), httpOptions).subscribe(data => {
      console.log(data);
    });
  }

  /**
   * Method to receive all chat history if exists
   */
  chatHistoryFunction() {
    // retrieve session
    const issueId = this.issueService.currentIssueValue;
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
   * Method to change the state of the current issue, so that the employee knows the issue is solved
   */
  markSolved() {
    const issueId = this.issueService.currentIssueValue;
    const body = new URLSearchParams();
    body.set('sessionId', issueId.toString());

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
   * Method to receive all tags linked to this issue, this includes the modem
   */
  getAllTags() {  // retrieve all tags from the issue
    const issueId = this.issueService.currentIssueValue;
    const username = this.authenticationService.currentUserValue.username;


    setTimeout(() => {

      // get modem
      this.http.get<any>(this.apiService.baseUrl + 'modem/getModemForUser/' + username)
        .subscribe(modemResponse => {
          console.log(modemResponse);
          this.modem = modemResponse;
          this.selectedModem = this.modem.modemNaam;
        });

      // get tags
      this.http.get<any>(this.apiService.baseUrl + 'tags/gettagsforissue/' + issueId)
        .subscribe(() => {
        });
      this.http.get<any>(this.apiService.baseUrl + 'tags/gettagsforissue/' + issueId)
        .subscribe(response => {
          console.log(response);
          this.tags = response;
          this.selectedTag1 = this.tags[1];
          this.selectedTag2 = this.tags[0];
          this.selectedTag3 = this.tags[2];

          setTimeout(() => {
              if (this.messagesArray.length < 1) {
                this.welcomeMessage(this.selectedTag1, this.selectedTag2, this.selectedTag3, this.selectedModem);
              } else {
                console.log('no welcome');
              }
            },
            2000);

          // this.getModem(this.authenticationService.currentUserValue.username);
        });
    }, 1000);
  }

  /**
   * Method to receive the modem linked to this issue
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
   * Method to inform the client that his data is sent successfully to the employee, in the form of a welcome message
   */
  private welcomeMessage(tag1, tag2, tag3, modem) {
    setTimeout(() => {
        this.messageText.author = this.authenticationService.currentUserValue.username;
        this.messageText.time = ChatDialogComponent.getTime();
        this.messageText.message = ': Hallo! Ik heb last van ' + tag1 + ', dit heeft te maken met ' + tag2 + ' en ' + tag3
          + '. Ik maak gebruik van het modem met het type: ' + modem;
        this.totalMessage = (this.messageText.time + this.messageText.author + this.messageText.message);
        this.messagesArray.push(this.totalMessage); // fill array
        this.messageArea = this.messagesArray.toString();  // SHOULD FILL TEXTAREA WITH LIST
      },
      1000);
    this.value = '';
  }

  /**
   * Method to distinct messages from the sender
   */
  private checkMessageOrigin(origin: string): boolean {
    if (this.messagesArray.length === 0) {
      return origin.search(this.SelectedEmployeename) === 1;
    }
    return origin.search(this.SelectedEmployeename) !== -1;
  }

  ngOnInit(): void {
    console.log('SESSION = ' + this.issueService.currentIssueValue);
    this.getCurrentIssue();
    this.getAllTags();
    this.chatHistoryFunction();
    this.getStatus();
  }

  /**
   * Method to receive the status of the current issue
   */
  getStatus() {
    const issue = this.issueService.currentIssueValue;
    this.http.get<any>(this.apiService.baseUrl + 'issue/issuebyidcomplete/' + issue)
      .subscribe(response => {
        this.selectedStatus = response.map(({idStatus}) => idStatus);
      });
  }
}

