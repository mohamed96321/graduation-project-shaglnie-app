import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/language.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['../shared-style.css', './services.component.css'],
})
export class ServicesComponent implements OnInit {
  language = '';
  constructor(private langService: LanguageService) {}

  ngOnInit(): void {
    this.language = this.langService.getCurrentLang();
    this.langService.getCurrentLanguage().subscribe(lang => {
      this.language=lang
    })}
}
