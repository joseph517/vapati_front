import { Injectable } from '@angular/core';
import { enviroments } from '../../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserResponse } from '../interfaces/user-response.interface';
import { CategoryResponse } from '../interfaces/category-response.interface';
import { UserRequest } from '../interfaces/user-request.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  private readonly baseUrl = enviroments.baseUrl;
  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(`${this.baseUrl}auth/login`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('user', JSON.stringify(response.userInfo));
        }
      )
    );
  }

  getCategories(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(`${this.baseUrl}api/categories/list`);
  }

  register(user: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.baseUrl}api/users/create`, user);
  }

}
