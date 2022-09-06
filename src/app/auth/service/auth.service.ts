import { ApiResponse } from './../../models/api-response';
import { environment } from './../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models';
import { catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = environment.BASE_API_URL;

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login(user: ApiResponse<User>) {
    return this.httpClient
      .post<User>(`${this.apiURL}auth/login`, user, httpOptions)
      .pipe(
        map((user) => {
          console.log(user);
          localStorage.setItem('userToken', JSON.stringify(user));
          this.toastr.success('Login successful');
          this.router.navigate(['/']);
        }),
        catchError((err) => {
          this.toastr.error(err.error.message);
          return of(err.error.message);
        })
      )
      .subscribe();
  }

  register(user: User) {
    return this.httpClient
      .post<User>(`${this.apiURL}auth/register`, user, httpOptions)
      .pipe(
        map((user) => {
          console.log(user);
          localStorage.setItem('userToken', JSON.stringify(user));
          this.toastr.success('Register successful');
          this.router.navigate(['/auth/login']);
        }),
        catchError((err) => {
          this.toastr.error(err.error.message);
          return of(err.error.message);
        })
      )
      .subscribe();
  }
}
