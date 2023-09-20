import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/language.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['../shared-style.css', './blogs.component.css'],
})
export class BlogsComponent implements OnInit {
 language = '';
  constructor(private langService: LanguageService) {}

  ngOnInit(): void {
    this.language = this.langService.getCurrentLang();
    this.langService.getCurrentLanguage().subscribe(lang => {
      this.language=lang
    })}
}
