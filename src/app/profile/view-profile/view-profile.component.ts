import { LanguageService } from './../../language.service';
import { ReportService } from './report.service';
import { NgForm } from '@angular/forms';
import {
  Testimonial,
  TestimonialService,
} from '../../home/testimonial/testimonial.service';
import { Post } from '../../create-post/post.model';
import { AuthService, UserData } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit {
  language = '';
  userId: string = '';
  userPosts: Post[] = [];
  userReviews: Testimonial[] = [];
  isAuth: boolean = false;
  isAdminSaved = false;
  userData: UserData = {
    profileImage: '',
    _id: '',
    userName: '',
    userEmail: '',
    userPhone: '',
    userBigCity: '',
    userCity: '',
    job: '',
    workerIdentityImages: [''],
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private testimonialService: TestimonialService,
    private reportService: ReportService,
    private langService: LanguageService
  ) {}

  ngOnInit(): void {
    this.language = this.langService.getCurrentLang();
    this.langService.getCurrentLanguage().subscribe((lang) => {
      this.language = lang;
    });
    this.isAuth = this.authService.getToken() ? true : false;
    this.isAdminSaved = this.authService.getIsAdmin();
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
    });
    this.authService
      .getUserById(this.userId)
      .subscribe(
        (getUserResualt: {
          message: string;
          user: UserData;
          userPosts: Post[];
        }) => {
          this.userData = getUserResualt.user;
          this.userPosts = getUserResualt.userPosts;
          console.log(this.userPosts);
        }
      );
    this.testimonialService.getReview(this.userId);
    this.testimonialService.getUpdatedTestimonials().subscribe((testis) => {
      this.userReviews = testis;
    });
  }
  acceptWorker() {
    this.authService.onAcceptWorker(this.userId).subscribe((resualt) => {
      this.userData.accepted = true;
      console.log(resualt);
    });
  }
  deleteUser() {
    const confirm = window.confirm('سوف يتم حذف الحساب ');
    confirm
      ? this.authService.onDeleteUserById(this.userId).subscribe((resualt) => {
          console.log(resualt);
          this.router.navigate(['/admin/statistic']);
        })
      : null;
  }
  onAddReport(f: NgForm) {
    const reportMessage = f.value['reportMessage'];
    this.reportService.addReport(reportMessage, this.userId);
    f.reset();
  }
}
