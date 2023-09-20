import { AuthService } from './../../auth/auth.service';
import { Testimonial, TestimonialService } from './testimonial.service';
import { Component, Input, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/language.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'],
})
export class TestimonialComponent implements OnInit {
  isAdmin = false;
  language = "";
  @Input() testimonials: Testimonial[] = [];
  constructor(private authService: AuthService,
    private langService :LanguageService
  ) {}
  ngOnInit(): void {

    this.language = this.langService.getCurrentLang();
    this.langService.getCurrentLanguage().subscribe(lang => {
      this.language = lang
    });
    this.isAdmin = this.authService.getIsAdmin() ? true : false;
  }
}
