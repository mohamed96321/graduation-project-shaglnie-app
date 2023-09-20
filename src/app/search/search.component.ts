import { LanguageService } from './../language.service';
import { Post } from './../create-post/post.model';
import { SearchService } from './search.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
// DECARATOR
/**
 * <DIV>KEKKEKKE</DIV>
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  language = '';
  searched: boolean = false;
  selectedPosts: Post[] = [];
  savedSelectedPost: Post[] = [];
  selectedUsers: {
    _id: string;
    userName: string;
    profileImage: string;
    userPhone: string;
  }[];
  resualt: string;
  userData: { job: string; userBigCity: string; userCity: string } = {
    job: '',
    userBigCity: '',
    userCity: '',
  };

  constructor(
    private autService: AuthService,
    private searchService: SearchService,
    private langService: LanguageService
  ) {}

  ngOnInit(): void {
    // language
    this.language = this.langService.getCurrentLang();
    this.langService.getCurrentLanguage().subscribe((lang) => {
      this.language = lang;
    });
    if (this.autService.getToken) {
      const { job, userBigCity, userCity } =
        this.autService.getLocalStorageData();
      this.userData = {
        job,
        userBigCity,
        userCity,
      };
    }
    this.selectedPosts = this.savedSelectedPost;
  }
  ngOnDestroy(): void {
    this.savedSelectedPost = this.selectedPosts;
  }
  onSubmit(f: NgForm): void {
    const { job, bigCity, city, isWorker } = f.value;
    this.searchService
      .search(job, bigCity, city, isWorker)
      .subscribe((resualt) => {
        this.searched = true;
        this.selectedPosts = resualt.posts;
        this.selectedUsers = resualt.users;
      });
  }
}
