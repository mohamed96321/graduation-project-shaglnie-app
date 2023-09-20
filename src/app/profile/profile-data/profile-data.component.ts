import { LanguageService } from './../../language.service';
import { AuthService, UserData } from './../../auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css'],
})
export class ProfileDataComponent implements OnInit {
  @Input() userData: UserData;
  language = '';
  isAdminSaved = false;
  activeUserId: string = '';
  constructor(
    private authService: AuthService,
    private langService: LanguageService
  ) {}
  ngOnInit(): void {
    this.language = this.langService.getCurrentLang();
    this.langService.getCurrentLanguage().subscribe((lang) => {
      this.language = lang;
    });
    this.isAdminSaved = this.authService.getIsAdmin() ? true : false;
    this.activeUserId = this.authService.getLocalStorageData()._id;
  }
  onLogout(): void {
    this.authService.logout();
  }
}
