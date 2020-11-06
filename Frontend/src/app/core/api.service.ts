import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models';
import {Observable} from 'rxjs';
import {ApiResponse} from '../models/api.response';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  baseUrl = 'http://localhost:8080/ziggo-application-1.0-SNAPSHOT/api/';

  getUsers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + 'users/all');
  }

  getAllIssues(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + 'issue/all');
  }

  getUserById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + 'users/getUserById/' + id);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, user);
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + 'users/' + user.idUser, user);
  }

  deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + 'users/' + id);
  }

  getAllEmployees(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'users/getallemployees');
  }

  getEmployeeScoreById(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'score/getEmployeeScoreById/' + id);
  }

  getAverageEmployeeScore(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + 'score/' + id);
  }

  getAllModems(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'modem/all');
  }

  getOpenChatsPerDatePerEmployee(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'issue/getOpenEmployeeChat/' + id);
  }
}
