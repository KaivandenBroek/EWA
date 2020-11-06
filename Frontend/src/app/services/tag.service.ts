import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiService} from '../core/api.service';

import {Tag} from '../models';
import {CurrentIssueService} from './currentIssue.service';

@Injectable()
export class TagService {
  // create new behavior subject
  private currentSubjectTag: BehaviorSubject<Tag>;
  // create new Observable
  public currentTag: Observable<Tag>;

  /**
   * constructor
   * @param http received from import
   * @param apiService http received from import
   * @param tag http received from import
   * @param issue http received from import
   */
  constructor(private http: HttpClient, private apiService: ApiService, private tag: Tag, private issue: CurrentIssueService) {
    // set behavior subject by making use of the currentTag item in local storage
    this.currentSubjectTag = new BehaviorSubject<Tag>(JSON.parse(localStorage.getItem('currentTag')));
    // set observable by observing the behavior subject
    this.currentTag = this.currentSubjectTag.asObservable();
  }

  /**
   * method to get current tag value by model Tag
   */
  public get currentTagValue(): Tag {
    return this.currentSubjectTag.value;
  }

  /**
   * method to set 1st tag
   * @param tag1 received from method call
   */
  public tag1(tag1) {
    //  set tag1
    this.tag.tag1 = tag1;
    // set tag1 in local storage
    localStorage.setItem('tag1', tag1.toString());
  }

  /**
   * method to set tag 2 and use tag 1
   * @param tag2 received from method call
   */
  public tag2(tag2) {
    // get tag1 from local storage
    const tag1get = localStorage.getItem('tag1');
    // set tag 1
    this.tag.tag1 = Number(tag1get);
    // set tag 2
    this.tag.tag2 = tag2;
    // remove local storage item tag1
    localStorage.removeItem('tag1');
  }

  /**
   * method to set tag 3 and call all tags
   * @param tag3 received from method call
   */
  public tag3(tag3) {
    // set tag 3
    this.tag.tag3 = tag3;
    // call method
    this.callAll();
  }

  /**
   * method to call all tags and set as local storage
   */
  public callAll() {
    localStorage.setItem('currentTag', JSON.stringify(this.tag));
  }

  /**
   * method to get all tags from local storage and give to post method
   */
  public getAllTagsAndSessionId() {
    // call method with required values
    this.setTags(this.issue.currentIssueValue, this.currentTagValue.tag1, this.currentTagValue.tag2, this.currentTagValue.tag3);
    // remove local storage
    localStorage.removeItem('currentTag');
  }

  /**
   * method for extra function that was not yet funished
   * @param tag1EXTRA received from method call
   * @param tag2EXTRA received from method call
   * @param tag3EXTRA received from method call
   */
  public methodForExtraFunctions(tag1EXTRA, tag2EXTRA, tag3EXTRA) {
    // call method with required values
    this.setTags(this.issue.currentIssueValue, tag1EXTRA, tag2EXTRA, tag3EXTRA);
  }

  /**
   * method to post tags to data base
   * @param sessionId received from method call
   * @param tag1 received from method call
   * @param tag2 received from method call
   * @param tag3 received from method call
   */
  public setTags(sessionId: any, tag1: number, tag2: number, tag3: number) {
    // set body
    const body = new URLSearchParams();
    body.set('sessionId', String(sessionId));
    body.set('tag1', String(tag1));
    body.set('tag2', String(tag2));
    body.set('tag3', String(tag3));
    // set headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    // post tags to backend
    return this.http.post<any>(this.apiService.baseUrl + 'tags/newtags', body.toString(), httpOptions).subscribe(() => {
      }
    );
  }
}



