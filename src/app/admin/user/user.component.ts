import { NgForm } from '@angular/forms';
import { User } from './user.model';
import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/language.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  language = '';
  constructor(
    private userService: UserService,
    private langService: LanguageService
  ) {}
  ngOnInit(): void {
    this.language = this.langService.getCurrentLang();
    this.langService.getCurrentLanguage().subscribe((lang) => {
      this.language = lang;
    });
    this.userService.getUsersByPath('user');
    this.users = this.userService.getUsers();
    this.userService.getUpdatedUser().subscribe((users) => {
      this.users = users;
      console.log(this.users);
    });
  }
  getUsers(path: string) {
    this.userService.getUsersByPath(path);
  }
  onGetUserByEmail(f: NgForm) {
    const user = this.users.find((u) => u.userEmail === f.value.email);
    this.users = [user];
  }
}
