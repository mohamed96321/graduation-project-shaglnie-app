import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-users-search-list',
  templateUrl: './users-search-list.component.html',
  styleUrls: ['./users-search-list.component.css'],
})
export class UsersSearchList implements OnInit {
  @Input() users: {
    _id: string;
    profileImage: string;
    userName: string;
    userPhone: string;
    userBigCity: string;
    userCity: string;
  }[] = [];
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {}
  // GET THE CREATOR OF POST
  onGetUser(id: string) {
    const activeUserId = this.authService.getLocalStorageData()._id;
    const path = id === activeUserId ? '/profile' : `/profile/${id}`;
    this.router.navigate([path]);
  }
}
