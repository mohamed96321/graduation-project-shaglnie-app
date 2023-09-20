import { LanguageService } from './../../language.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  language = '';
  constructor(private langService: LanguageService) {}

  ngOnInit(): void {
    this.language = this.langService.getCurrentLang();
    this.langService.getCurrentLanguage().subscribe(lang => {
      this.language=lang 
    })
  }
}
