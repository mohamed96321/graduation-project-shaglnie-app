import { LanguageService } from 'src/app/language.service';
import { StatisticService } from './statistic.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-admin-statistics',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
})
export class StatisticComponent {
  language = '';
  counts: {
    postCount: number;
    userCount: number;
    commentCount: number;
    reportCount: number;
  } = {
    postCount: 0,
    userCount: 0,
    commentCount: 0,
    reportCount: 0,
  };
  constructor(
    private statisticService: StatisticService,
    private langService: LanguageService
  ) {}
  ngOnInit(): void {
    this.language = this.langService.getCurrentLang();
    this.langService.getCurrentLanguage().subscribe((lang) => {
      this.language = lang;
    });
    this.statisticService.getNumbers().subscribe((resualt) => {
      this.counts = resualt;
      console.log(resualt);
    });
  }
}
