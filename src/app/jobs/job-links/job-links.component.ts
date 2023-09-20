import { LanguageService } from 'src/app/language.service';
import { JobService } from './../jobs.service';
import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'job-links',
  templateUrl: './job-links.component.html',
  styleUrls: ['./job-links.component.css'],
})
export class JobLinksComponent {
  language: string = '';
  @Input() postedJobs: string[] = [];
  constructor(
    private jobService: JobService,
    private langService: LanguageService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.language = this.langService.getCurrentLang();
    this.langService.getCurrentLanguage().subscribe((lang) => {
      this.language = lang;
    });
  }
  getPosts(job: string, ele: HTMLElement) {
    document.querySelectorAll('ul li').forEach((li) => {
      li.classList.remove('active');
    });
    ele.classList.add('active');
    this.jobService.getPostByJob(job);
  }
}
