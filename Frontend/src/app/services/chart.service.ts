import {Injectable} from '@angular/core';
import {Chart} from 'chart.js';

@Injectable()
export class ChartService {
  // create new values to give name
  newChat = 'Nieuw';
  openChat = 'Open';
  closedChat = 'Gesloten';
  // create a Chart object
  public myChart: Chart;

  /**
   * this class is created to help the stats pages it basically holds al the chart types
   * there are 4 chart types you have 2 empty and 2 filled charts so for every chart page you have two that is 1 filled chart and 1 empty
   * the logic's behind this are explained inside the stats service class
   */

  constructor() {
  }

  ChartDetailed(htmlRef, open, solved) {
    // Bar chart:
    this.myChart = new Chart(htmlRef, {
      type: 'bar',
      data: {
        labels: [this.openChat, this.closedChat],
        datasets: [{
          label: 'Chats',
          data: [open, solved],
          backgroundColor: [
            'rgba(255, 165, 0, 1)',
            'rgba(255, 165, 0, 1)',
            'rgba(255, 165, 0, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        // events: ['Click'],
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            display: true
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: 5,
              stepSize: 1
            },
            display: true
          }]
        }
      }
    });
  }

  ChartDashBoard(htmlRef, newChats, openChats, closedChats) {
    // Bar chart:
    this.myChart = new Chart(htmlRef, {
      type: 'bar',
      data: {
        labels: [this.newChat, this.openChat, this.closedChat],
        datasets: [{
          label: '# of Votes',
          data: [newChats, openChats, closedChats],
          backgroundColor: [
            'rgba(255, 165, 0, 1)',
            'rgba(255, 165, 0, 1)',
            'rgba(255, 165, 0, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            display: true
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: 5,
              stepSize: 1
            },
            display: true
          }]
        }
      }
    });
  }

  ChartEmptyDashBoard(htmlRef) {
    // Bar chart:
    this.myChart = new Chart(htmlRef, {
      type: 'bar',
      data: {
        labels: [this.newChat, this.openChat, this.closedChat],
        datasets: [{
          label: '# of Votes',
          data: [0, 0, 0],
          backgroundColor: [
            'rgba(255, 165, 0, 1)',
            'rgba(255, 165, 0, 1)',
            'rgba(255, 165, 0, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            display: true
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: 5,
              stepSize: 1
            },
            display: true
          }]
        }
      }
    });
  }

  ChartEmptyDetailed(htmlRef) {
    // Bar chart:
    this.myChart = new Chart(htmlRef, {
      type: 'bar',
      data: {
        labels: [this.openChat, this.closedChat],
        datasets: [{
          label: 'Chats',
          data: [0, 0],
          backgroundColor: [
            'rgba(255, 165, 0, 1)',
            'rgba(255, 165, 0, 1)',
            'rgba(255, 165, 0, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        // events: ['Click'],
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            display: true
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: 5,
              stepSize: 1
            },
            display: true
          }]
        }
      }
    });
  }
}
