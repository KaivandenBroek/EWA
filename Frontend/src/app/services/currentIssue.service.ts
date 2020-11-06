import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from '../core/api.service';
import {Issue} from '../models/issue';

@Injectable()
export class CurrentIssueService {
  // create mew behavior subject
  private currentSubjectIssue: BehaviorSubject<Issue>;
  // create observable for Issue
  public currentIssue: Observable<Issue>;
  // create behavior subject with value null
  private sessionSource = new BehaviorSubject<Issue>(null);
  // create current session as observable
  currentSession = this.sessionSource.asObservable();
  // create issue format as Issue
  private issueFormat: Issue;

  /**
   * constructor
   * @param http service received from import
   * @param apiService received from import
   */
  constructor(private http: HttpClient, private apiService: ApiService) {
    // set behavior subject from local storage get
    this.currentSubjectIssue = new BehaviorSubject<Issue>(JSON.parse(localStorage.getItem('currentIssue')));
    // get current issue from behavior subject as observable
    this.currentIssue = this.currentSubjectIssue.asObservable();
    // set behavior subject from local storage get
    this.sessionSource = new BehaviorSubject<Issue>(JSON.parse(localStorage.getItem('currentSession')));
    // get current session from behavior subject as observable
    this.currentSession = this.sessionSource.asObservable();
  }

  /**
   * method to get current issue value as Issue object
   * used by client
   */
  public get currentIssueValue(): Issue {
    return this.currentSubjectIssue.value;
  }

  /**
   * method to get current session value as issue object
   * used by client
   */
  public get currentSessionValue(): Issue {
    return this.sessionSource.value;
  }

  /**
   * method to change the current session
   * used by client
   * @param currentSession received from method call
   */
  public changeSession(currentSession) {
    // local storage remove session id
    localStorage.removeItem('sessionId');
    // local storage set new session id
    localStorage.setItem('sessionId', currentSession.toString());
    // call method call value
    this.callvalue();
  }

  /**
   * method to change issue
   * used by employee
   * @param currentIssue received from method call
   */
  public changeIssue(currentIssue) {
    // local storage remove session id
    localStorage.removeItem('currentIssue');
    // local storage set new session id
    localStorage.setItem('currentIssue', currentIssue.toString());
    // call method call value
    this.callvalue();
  }

  /**
   * method to create a new issue
   * used by client
   * @param clientId received from method call
   */
  createIssue(clientId: any) {
    // local storage remove session id
    localStorage.removeItem('currentIssue');
    // create a const body
    const body = new URLSearchParams();
    body.set('clientId', clientId);
    // set http headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    // post method to create a new issue and pass the values to the backend
    return this.http.post<any>(this.apiService.baseUrl + 'issue/createissue', body.toString(), httpOptions).subscribe(data => {
      // received value is set as issue format
      this.issueFormat = data;
      // set local storage
      localStorage.setItem('currentIssue', JSON.stringify(this.issueFormat.sessionId));
    });
  }

  /**
   * method to remove issue from local storage
   * used by client
   */
  removeIssueFromStorage() {
    localStorage.removeItem('currentIssue');
    this.currentSubjectIssue.next(null);
  }

  /**
   * method to remove issue from local storage
   * used by employee
   */
  removeSessionFromStorage() {
    localStorage.removeItem('currentSession');
    this.currentSubjectIssue.next(null);
  }

  /**
   * method to call the localstorage
   * used by client
   */
  public callvalue() {
    return localStorage.getItem('sessionId');
  }

  /**
   * method to call value
   * used by employee
   */
  public callvalueClient() {
    return localStorage.getItem('currentIssue');
  }
}
