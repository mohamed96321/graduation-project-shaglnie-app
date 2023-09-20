import { Report } from './report.model';
import { ReportService } from './report.service';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/language.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  reports: Report[] = [];
  reportDeleted: boolean = false;
  language = '';
  constructor(
    private reportService: ReportService,
    private langService: LanguageService
  ) {}
  ngOnInit(): void {
    this.language = this.langService.getCurrentLang();
    this.langService.getCurrentLanguage().subscribe((lang) => {
      this.language = lang;
    });
    this.reportService.getAllReports();
    this.reports = this.reportService.getReports();
    this.reportService.getUpdatedReports().subscribe((reports) => {
      this.reports = reports;
    });
  }
  deleteRport(id: string) {
    this.reportDeleted = true;
    this.reportService.deleteReport(id);
    setTimeout(() => {
      this.reportDeleted = false;
    }, 1000);
  }
}
