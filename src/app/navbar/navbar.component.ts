import { LanguageService } from './../language.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  lang = 'عربي';
  language: string = 'arb';
  isAuthenticated = false;
  isAdmin = false;
  constructor(
    public authService: AuthService,
    private langService: LanguageService
  ) {}
  ngOnInit(): void {
    // check language
    this.language = this.langService.getCurrentLang();
    this.langService.getCurrentLanguage().subscribe((lang) => {
      this.language = lang;
    });
    this.lang = this.language === 'arb' ? 'English' : 'عربي';

    // get user state if user or not
    // by checking if there is token in local stroage
    this.isAdmin = (this.authService.getLocalStorageData().isAdmin as boolean)
      ? true
      : false;
    this.authService.isAdminUpdated().subscribe((isAdmin) => {
      this.isAdmin = isAdmin ? true : false;
    });
    this.isAuthenticated = this.authService.getToken() ? true : false;

    // update user state at run time
    this.authService.isAuthenticatedUser().subscribe((isAuth) => {
      this.isAuthenticated = isAuth ? true : false;
    });
  }
  //on change language
  onChangeLlanguage() {
    this.langService.changeLang();
    this.lang = this.language === 'arb' ? 'English' : 'عربي';
  }
  // logout form site
  onLogout(): void {
    this.authService.logout();
  }
}
