import { Subject, Observable } from 'rxjs';
import { Report } from './report.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private url = 'http://localhost:3000/api/report';
  private reports: Report[] = [];
  private updatedReports = new Subject<Report[]>();
  constructor(private http: HttpClient) {}
  getAllReports() {
    this.http.get<{ reports: Report[] }>(this.url).subscribe((resualt) => {
      this.reports = resualt.reports;
      this.updatedReports.next(this.reports);
    });
  }
  deleteReport(id: string) {
    const index = this.reports.findIndex((r) => r._id == id);
    this.http.delete(this.url + '/' + id).subscribe((resualt) => {
      console.log(resualt);
    });
    this.reports.splice(index, 1);
    this.updatedReports.next(this.reports);
  }
  getReports() {
    return this.reports;
  }
  getUpdatedReports(): Observable<Report[]> {
    return this.updatedReports.asObservable();
  }
}
