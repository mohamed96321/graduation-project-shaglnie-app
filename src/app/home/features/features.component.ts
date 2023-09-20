import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/language.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['../shared-style.css', './features.component.css'],
})
export class FeaturesComponent implements OnInit {
  language = '';
  constructor(private langService: LanguageService) {}

  ngOnInit(): void {
    this.language = this.langService.getCurrentLang();
    this.langService.getCurrentLanguage().subscribe(lang => {
      this.language=lang
    })}
}
