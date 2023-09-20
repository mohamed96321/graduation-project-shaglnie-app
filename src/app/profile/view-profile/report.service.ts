import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly url = 'http://localhost:3000/api/report';
  constructor(private authService: AuthService, private http: HttpClient) {}
  addReport(reportMessage: string, reportTo: string) {
    const creator = this.authService.getLocalStorageData()._id;
    this.http
      .post(this.url, {
        creator,
        reportMessage,
        reportTo,
      })
      .subscribe((resualt) => {});
  }
}
