import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private users: User[] = [];
  private apiUrl = 'this.users';

  constructor(private http: HttpClient) { }
  // getUsers(): Observable<User[]> {
  //   return of(this.users);
  // }
  getUsers(): Observable<User[]> {
    console.log('Fetching users...');
    return this.http.get<User[]>(this.apiUrl); // replace apiUrl with your API endpoint
  }

  addUser(user: User): Observable<User> {
    this.users.push(user);
    return of(user);
  }
}
