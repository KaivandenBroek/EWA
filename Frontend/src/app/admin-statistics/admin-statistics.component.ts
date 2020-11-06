import {Component, ElementRef, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Chart} from 'chart.js';
import {DatePipe} from '@angular/common';
import {User} from '../models';
import {AuthenticationService, StatsService, UserService} from '../services';
import {Observable} from 'rxjs';
import {ApiService} from '../core/api.service';
import {HttpClient} from '@angular/common/http';
import {ChartService} from '../services/chart.service';

@Component({
  styleUrls: ['admin-statistics.component.css'],
  templateUrl: 'admin-statistics.component.html',
  providers: [DatePipe]
})
export class AdminStatisticsComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private modal: NgbModal,
              private elementRef: ElementRef,
              private datePipe: DatePipe,
              private http: HttpClient,
              private apiService: ApiService,
              private statsService: StatsService,
              private chartService: ChartService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  currentUser: User;
  public employeeId: number;
  users: User[] = [];
  employees: User[];
  countAllEntries: any;
  currentRate: any;
  today: number = Date.now();
  title = 'Statistics of today: ';

  ngOnInit() {
    this.getEmployees().subscribe(data => this.users = data);
    this.apiService.getAllEmployees().subscribe(
      data => this.employees = data
    );
    this.Chart();
  }

  /**
   * If you select an employee from the combobox,
   * this method will trigger some methods with the value
   * of one of the dropdown buttons.
   *
   * @param event event handler
   */
  selectChangeHandler(event: any) {
    this.getEmployeeId(event.target.value);
    this.countEntries(event.target.value);
    this.getAverageEmployeeScore(event.target.value);
    this.Chart();

  }

  /**
   * Load in chart that is displayed on the page
   */
  Chart() {
    const htmlRef = this.elementRef.nativeElement.querySelector(`canvas`);
    if (this.statsService.currentDetailedStatsValue === null) {
      this.chartService.ChartEmptyDetailed(htmlRef);
    } else {
      this.chartService.ChartDetailed(htmlRef,
        this.statsService.currentDetailedStatsValue.getAllOpen,
        this.statsService.currentDetailedStatsValue.getAllSolved);
    }
  }

  /**
   * Get all the employees that exists from the API
   */
  getEmployees(): Observable<User[]> {
    return this.http.get<User[]>(this.apiService.baseUrl + 'users/getallemployees');
  }

  /**
   * Count all the entries from one single employee
   *
   * @param id id of the employee
   */
  countEntries(id: number) {
    this.apiService.getEmployeeScoreById(id).subscribe(result => {
      if (result.length === 0) {
        this.countAllEntries = 0;
      }
      this.countAllEntries = '(' + result.length + ')';
    });
  }

  /**
   * Get the average score from one single employee
   *
   * @param id id of the employee
   */
  getAverageEmployeeScore(id: number) {
    this.apiService.getAverageEmployeeScore(id).subscribe(result => {
      this.currentRate = result;
    });
  }

  /**
   * Get the employee id of current employee
   *
   * @param id id of the employee
   */
  getEmployeeId(id: number) {
    this.employeeId = id;
    this.statsService.getAllForEmployee(id);
  }
}
