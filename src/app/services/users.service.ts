import { CreateUser } from './../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  users (searchName: String): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.baseUrl}/users/`)
  }

  create (createUser: CreateUser): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users/`, createUser)
  }

  update (updateUser: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${updateUser.id}`, updateUser)
  }

  delete (deleteUser: User): Observable<User>{
    return this.http.delete<User>(`${this.baseUrl}/users/${deleteUser.id}`)
  }
}
