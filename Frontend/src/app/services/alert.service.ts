import {Injectable} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Alert} from '../models/Alert';
import {AlertComponent} from '../alert';

@Injectable({providedIn: 'root'})
export class AlertService {
  // create subject
  private subject = new Subject<any>();
  // create boolean
  private keepAfterNavigationChange = false;
  // create behavior subject
  private newSubject: BehaviorSubject<Alert>;
  // create observable
  private newObservableSubject: Observable<Alert>;

  /**
   * constructor
   * @param router creates the service router
   * @param alert gets the alert component to be used inside this class
   */
  constructor(private router: Router, private alert: AlertComponent) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next(null);
        }
      }
    });
    // create behavior subject to receive the alert
    this.newSubject = new BehaviorSubject<Alert>(JSON.parse(localStorage.getItem('currentAlert')));
    // create new observable to observe the behavior subject
    this.newObservableSubject = this.newSubject.asObservable();
  }

  /**
   * method to get currentAlert values by using the Alert model
   */
  public get getCurrentAlertValues(): Alert {
    return this.newSubject.value;
  }

  /**
   * method that returns a succes message if called
   * @param message received by method call
   * @param keepAfterNavigationChange received from constructor
   */
  success(message: string, keepAfterNavigationChange = false) {
    // set value
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    // subject next and display message
    this.subject.next({type: 'success', text: message});
  }

  /**
   * method to throw a advanced error
   * @param message received from method call
   * @param keepAfterNavigationChange received from constructor
   */
  advancedErrorMethod(message: string, keepAfterNavigationChange = false) {
    // set value
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    // create a const alert to pass in as behavior subject
    const alert: Alert = {
      type: 'danger',
      message
    };
    // set localstorage item
    localStorage.setItem('currentAlert', JSON.stringify(alert));
    // set subject next
    this.newSubject.next(alert);
    // call method
    this.throwmessage();
  }

  /**
   * method that throws a alert globally throughout the application
   */
  throwmessage() {
    // check if value is null
    if (this.getCurrentAlertValues != null) {
      // throw message if not null
      this.alert.throwErrorMessage(this.getCurrentAlertValues.type, this.getCurrentAlertValues.message);
    } else {
      // if null remove alert from storage
      localStorage.removeItem('currentAlert');
    }
    // remove alert from storage
    localStorage.removeItem('currentAlert');
  }
}
