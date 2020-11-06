import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../core/api.service';
import {Stats} from '../models/stats';
import {ChartService} from './chart.service';

@Injectable()
export class StatsService {
  // create new BehaviorSubject
  private currentStatSubject: BehaviorSubject<Stats>;
  // create new Observable
  public currentStat: Observable<Stats>;
  // create new BehaviorSubject
  public currentDetailedStatSubject: BehaviorSubject<Stats>;
  // create new Observable
  public currentDetailedStat: Observable<Stats>;

  /**
   * constructor
   * @param http received from import
   * @param apiService received from import
   * @param chartService received from import
   */
  constructor(private http: HttpClient, private apiService: ApiService, private chartService: ChartService) {
    // set behavior subject by making use of local storage item
    this.currentStatSubject = new BehaviorSubject<Stats>(JSON.parse(localStorage.getItem('currentStat')));
    // read behavior subject as observable
    this.currentStat = this.currentStatSubject.asObservable();
    // set behavior subject by making use of local storage item
    this.currentDetailedStatSubject = new BehaviorSubject<Stats>(JSON.parse(localStorage.getItem('currentDetailedStat')));
    // read behavior subject as observable
    this.currentDetailedStat = this.currentStatSubject.asObservable();
  }

  /**
   * method to get current stats value by Stats object
   * used in dashboard
   */
  public get currentStatsValue(): Stats {
    return this.currentStatSubject.value;
  }

  /**
   * method to get current detailed stats value
   * used in detailed stats
   */
  public get currentDetailedStatsValue(): Stats {
    return this.currentDetailedStatSubject.value;
  }

  /**
   * method to get all for current date
   * used in dashboard
   */
  getAllForCurrentDate() {
    // local storage remove item
    localStorage.removeItem('currentStat');
    // return a get call to get all stats for the dashboard
    return this.http.get<any>(this.apiService.baseUrl + 'stats/getallnew').subscribe(data => {
      // local storage set behavior subject by data received from the get call
      localStorage.setItem('currentStat', JSON.stringify(data));
      //  next on subject
      this.currentStatSubject.next(data);
    });
  }

  /**
   * method to get all detailed stats naming is not correct
   * used in detailed stats
   * @param id received from call
   */
  getAllForEmployee(id) {
    // return the get call to get all stats from specific employee
    return this.http.get<Stats>(this.apiService.baseUrl + 'stats/getallforemployee/' + id).subscribe(data => {
      // local storage set new subject with received data
      localStorage.setItem('currentDetailedStat', JSON.stringify(data));
      // next on subject
      this.currentDetailedStatSubject.next(data);
      // set chart data
      this.chartService.myChart.data.datasets[0].data[0] = this.currentDetailedStatsValue.getAllOpen;
      // set chart data
      this.chartService.myChart.data.datasets[0].data[1] = this.currentDetailedStatsValue.getAllSolved;
      // update chart
      this.chartService.myChart.update();
    });
  }
}
