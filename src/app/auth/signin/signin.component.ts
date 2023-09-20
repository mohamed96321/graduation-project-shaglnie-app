import { LanguageService } from './../../language.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../shared-style.css', './signin.component.css'],
})
export class SigninComponent implements OnInit {
  errorMsg: string = null;
  language = '';
  loading: boolean;
  signinData: { userEmail: string; userPassword: string } = {
    userEmail: '',
    userPassword: '',
  };
  constructor(
    public autService: AuthService,
    private langService: LanguageService
  ) {}
  ngOnInit(): void {
    this.language = this.langService.getCurrentLang();
    this.langService.getCurrentLanguage().subscribe((lang) => {
      this.language = lang;
    });
  }

  onSignin(signinForm: NgForm): void {
    this.loading = true;
    this.signinData = signinForm.value;
    const { userEmail, userPassword } = signinForm.value;
    this.autService.signin(userEmail, userPassword);
    this.autService.errMsg.subscribe((resualt) => {
      setTimeout(() => {
        this.errorMsg = resualt;
        this.loading = false;
      }, 1200);
    });
  }
}
