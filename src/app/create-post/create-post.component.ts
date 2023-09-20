import { LanguageService } from './../language.service';
import { SocketIoService } from './../shared/socket-io.service';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: [
    '../auth/signin/signin.component.css',
    './create-post.component.css',
  ],
})
export class CreatePostComponent implements OnInit {
  language = '';
  postCreated: boolean = false;
  loading = false;
  errorMessage = null;
  postImages: string[] = [];
  postForm: FormGroup;
  userData: {
    job: string;
    userBigCity: string;
    userCity: string;
    userPhone: string;
  };
  constructor(
    private authService: AuthService,
    private postService: PostService,
    private socketIOService: SocketIoService,
    private langService: LanguageService
  ) {}
  ngOnInit(): void {
    // languages
    this.language = this.langService.getCurrentLang();
    this.langService.getCurrentLanguage().subscribe((lang) => {
      this.language = lang;
    });
    // get user info form loacal storage`
    if (this.authService.getToken) {
      const { userBigCity, userCity, userPhone, job } =
        this.authService.getLocalStorageData();
      this.userData = {
        userBigCity,
        userCity,
        userPhone,
        job,
      };
    }
    // initialize post information if there is user
    const { userBigCity, userCity, userPhone, job } = this.userData;
    this.postForm = new FormGroup({
      job: new FormControl(job, [Validators.required]),
      creatorBigCity: new FormControl(userBigCity, [Validators.required]),
      creatorCity: new FormControl(userCity, [Validators.required]),
      creatorPhone: new FormControl(userPhone, [Validators.required]),
      postText: new FormControl(null, [Validators.required]),
      createByWorker: new FormControl(false),
      postImages: new FormControl(null),
    });
  }
  // capture posts images on front end
  onImagesPicked(event: Event) {
    this.postImages = [];
    const files = (event.target as HTMLInputElement).files;
    this.postForm.patchValue({
      postImages: files,
    });
    this.postForm.get('postImages').updateValueAndValidity();
    for (let file in files) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.postImages.push(<string>fileReader.result);
      };
      fileReader.readAsDataURL(files[file]);
    }
  }
  onAddPost() {
    if (this.postForm.valid) {
      this.loading = true;
      this.errorMessage = null;
      const {
        creatorPhone,
        creatorBigCity,
        creatorCity,
        job,
        postText,
        createByWorker,
        postImages,
      } = this.postForm.value;
      this.postService
        .addPost(
          job,
          creatorPhone,
          creatorBigCity,
          creatorCity,
          postText,
          postImages,
          createByWorker
        )
        .subscribe(
          (resualt: { message: string; newPost: Post }) => {
            console.log(resualt);

            this.socketIOService.onAddPost(resualt.newPost);
            this.postCreated = true;
            this.loading = false;
            this.errorMessage = null;
            this.postForm.reset();
            this.postForm.patchValue({
              creatorBigCity,
              creatorCity,
              creatorPhone,
              createByWorker: false,
            });
            this.postForm.get('createByWorker').updateValueAndValidity();
            this.postForm.get('creatorBigCity').updateValueAndValidity();
            this.postImages = [];
            setTimeout(() => {
              this.postCreated = false;
            }, 1000);
          },
          (e: Response) => {
            if (e.status === 401) {
              this.errorMessage = 'برجاء تسجيل الدخول اولا';
            } else {
              this.errorMessage = 'برجاء المحاوله وقت اخر';
            }
            this.loading = false;
            this.postCreated = false;
            setTimeout(() => {
              this.errorMessage = null;
            }, 2000);
          }
        );
    }
  }
  onReload(): void {
    this.errorMessage = null;
    this.loading = false;
  }
}
