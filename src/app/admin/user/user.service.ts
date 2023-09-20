import { Subject } from 'rxjs';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private url = 'http://localhost:3000/api/';
  private users: User[] = [];
  private UpdatedUsers = new Subject<User[]>();
  constructor(private http: HttpClient) {}
  getUsersByPath(path: string) {
    this.http
      .get(this.url + path)
      .subscribe(
        (resualt: { message: string; usersCount: number; users: User[] }) => {
          this.users = resualt.users;
          this.UpdatedUsers.next(this.users);
        }
      );
  }
  getOnlyUsers() {
    this.http
      .get(this.url + 'users')
      .subscribe(
        (resualt: { message: string; usersCount: number; users: User[] }) => {
          this.users = resualt.users;
          this.UpdatedUsers.next(this.users);
        }
      );
  }

  getUsers() {
    return this.users;
  }
  getUpdatedUser() {
    return this.UpdatedUsers.asObservable();
  }
}
