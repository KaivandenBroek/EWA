import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../core/api.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  user: User[];
  editForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) {
  }

  // show user details
  ngOnInit() {
    const userId = window.localStorage.getItem('editUserId');
    if (!userId) {
      alert('Invalid action.');
      this.router.navigate(['clients']);
      return;
    }
    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.apiService.getUserById(+userId)
      .subscribe(data => {
        this.editForm.patchValue(data[0]); // 0 is set here, because the apiService is passing through an object
      });
  }

  /**
   * This method will update the user
   *
   * @param user complete user object
   */
  updateUser(user: User): Observable<User[]> {
    return this.http.put<User[]>(this.apiService.baseUrl + 'api/users/' + user.idUser, user);
  }

}
