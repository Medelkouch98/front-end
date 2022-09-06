import { ApiResponse } from './../../models/api-response';
import { environment } from './../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models';
import { map } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = environment.BASE_API_URL;

  constructor(private httpClient: HttpClient) {}

  login(user: ApiResponse<User>) {
    return this.httpClient
      .post<User>(`${this.apiURL}auth/login`, user, httpOptions)
      .pipe(
        map((user) => {
          console.log(user);
          localStorage.setItem('userToken', JSON.stringify(user));
        })
      )
      .subscribe();
  }

  register(user: User) {
    return this.httpClient.post<User>(
      `${this.apiURL}/auth/register`,
      user,
      httpOptions
    );
  }
}
