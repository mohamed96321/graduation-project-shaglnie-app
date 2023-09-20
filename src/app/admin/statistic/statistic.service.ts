import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  private url = 'http://localhost:3000/api/admin/statistic';
  constructor(private http: HttpClient) {}
  getNumbers() {
    return this.http.get<{
      postCount: number;
      userCount: number;
      commentCount: number;
      reportCount: number;
    }>(this.url);
  }
}
