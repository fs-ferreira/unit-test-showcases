import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../utils/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SpyonServiceService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }
}
