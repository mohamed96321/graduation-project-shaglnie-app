import { LanguageService } from './../../language.service';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../shared-style.css', './signup.component.css'],
})
export class SignupComponent implements OnInit {
  language = '';
  signupForm: FormGroup; // form for signup
  loading: boolean; // check loading state
  errorMsg: string; // get error message form
  alertMsg: string; // get to alert user about some information
  imagesPreview: string[] = [];
  isWorker: boolean = false;
  userFormControl = {
    userName: new FormControl(null, [Validators.required]),
    userEmail: new FormControl(null, [Validators.required, Validators.email]),
    userPhone: new FormControl(null, [Validators.required]),
    userBigCity: new FormControl(null, [Validators.required]),
    userCity: new FormControl(null, [Validators.required]),
    userPassword: new FormControl(null, [Validators.required]),
    isWorker: new FormControl(false),
  };
  constructor(
    public authService: AuthService,
    private langService: LanguageService
  ) {}
  ngOnInit(): void {
    this.language = this.langService.getCurrentLang();
    this.langService.getCurrentLanguage().subscribe((lang) => {
      this.language = lang;
    });
    this.loading = false;
    // initial signup form
    this.signupForm = new FormGroup({
      ...this.userFormControl,
    });
  }
  onChangeUser() {
    this.isWorker = !this.isWorker;
    if (this.isWorker) {
      this.signupForm = new FormGroup({
        ...this.userFormControl,
        job: new FormControl(null, [Validators.required]),
        workerIdentityImages: new FormControl(null, [Validators.required]),
      });
    } else {
      this.signupForm = new FormGroup({
        ...this.userFormControl,
      });
    }
  }
  onImagesPicked(event: Event): void {
    this.imagesPreview = [];
    const files = (event.target as HTMLInputElement).files;
    this.signupForm.patchValue({
      workerIdentityImages: files,
    });
    this.signupForm.get('workerIdentityImages').updateValueAndValidity();
    for (const file in files) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imagesPreview.push(fileReader.result as string);
      };
      fileReader.readAsDataURL(files[file]);
    }
  }
  onSignup(): void {
    if (this.signupForm.valid) {
      this.loading = true;
      const {
        userName,
        userEmail,
        userPhone,
        userBigCity,
        userCity,
        userPassword,
        isWorker,
        job,
        workerIdentityImages,
      } = this.signupForm.value;
      console.log(this.signupForm.value);
      this.authService.signup(
        userName,
        userEmail,
        userPhone,
        userBigCity,
        userCity,
        userPassword,
        isWorker,
        job,
        workerIdentityImages
      );
      this.authService.errMsg.subscribe((errMsg) => {
        this.errorMsg = errMsg;
        this.loading = false;
        this.signupForm.patchValue({
          userEmail: null,
        });
        this.signupForm.get('userEmail').updateValueAndValidity();
      });
      this.authService.alertMsg.subscribe((alertMsg) => {
        this.signupForm.reset();
        this.alertMsg = alertMsg;
        this.loading = false;
      });
    }
  }
}
