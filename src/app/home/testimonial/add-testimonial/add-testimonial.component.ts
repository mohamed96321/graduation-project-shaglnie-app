import { LanguageService } from './../../../language.service';
import { ActivatedRoute } from '@angular/router';
import { TestimonialService } from './../testimonial.service';
import { AuthService } from './../../../auth/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-testimonial',
  templateUrl: './add-testimonial.component.html',
  styleUrls: ['./add-testimonial.component.css'],
})
export class AddTestimonialComponent implements OnInit {
  language = '';
  errMsg: string = null;
  successMsg: string = null;
  private belongTo: string = null;
  isAdmin = false;
  constructor(
    private authService: AuthService,
    private testimonialService: TestimonialService,
    private route: ActivatedRoute,
    private langService :LanguageService
  ) {}
  ngOnInit(): void {

    this.language = this.langService.getCurrentLang();
    this.langService.getCurrentLanguage().subscribe(lang => {
      this.language = lang
    });
    this.isAdmin = this.authService.getIsAdmin() ? true : false;
  }
  onAddTestimonial(f: NgForm) {
    if (f.valid) {
      const {
        _id,
        profileImage,
        userName,
      } = this.authService.getLocalStorageData();
      if (_id) {
        this.route.params.subscribe((params) => {
          this.belongTo = params['id'] ? params['id'] : 'site';
        });
        const belongTo = this.belongTo;
        this.testimonialService.addTestimonial(
          _id,
          profileImage,
          userName,
          f.value.userOpnion,
          belongTo
        );
        this.successMsg = 'شكرا لمشاركتك برأيك';
        setTimeout(() => {
          this.successMsg = null;
        }, 1000);
        this.errMsg = null;
      } else {
        this.errMsg = 'برجاء تسجيل الدخول اولا';
        setTimeout(() => {
          this.errMsg = null;
        }, 3000);
        this.successMsg = null;
      }
    }
  }
}
