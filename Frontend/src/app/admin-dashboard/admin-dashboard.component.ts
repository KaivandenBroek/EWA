import {Component, OnInit, ElementRef} from '@angular/core';
import {Chart} from 'chart.js';
import {first} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {User} from '../models';
import {AuthenticationService, StatsService, UserService} from '../services';
import {ChartService} from '../services';

@Component({
  styleUrls: ['./admin-dashboard.component.css'],
  templateUrl: 'admin-dashboard.component.html',
  providers: [DatePipe]
})

export class AdminDashboardComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  employees: User[] = [];
  id = 0;
  today: number = Date.now();

  constructor(
    private elementRef: ElementRef,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private statsService: StatsService,
    private chartService: ChartService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.getAllActiveClients();
    this.getAllActiveEmployees();
    this.statsService.getAllForCurrentDate();
    setTimeout(() => {
        this.statsService.currentDetailedStatSubject.next(null);
        this.Chart();
      },
      1000);
  }

  // load in chart to display chats
  Chart() {
    const htmlRef = this.elementRef.nativeElement.querySelector(`canvas`);
    if (this.statsService.currentStatsValue === null) {
      this.chartService.ChartEmptyDashBoard(htmlRef);
    } else {
      this.chartService.ChartDashBoard(htmlRef,
        this.statsService.currentStatsValue.getAllNew,
        this.statsService.currentStatsValue.getAllOpen,
        this.statsService.currentStatsValue.getAllSolved);
    }
  }

  /**
   * Method to receive all active employees and show on the admin dashboard
   */
  getAllActiveEmployees() {
    this.userService.getAllActiveEmployees().pipe().subscribe(employees => {
      this.employees = employees;
    });
  }

  /**
   * Method to receive all active clients and show on the admin dashboard
   */
  getAllActiveClients() {
    this.userService.getAllActiveClients().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }
}
