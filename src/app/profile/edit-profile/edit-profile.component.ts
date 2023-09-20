import { UserData } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { LanguageService } from 'src/app/language.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['../../auth/shared-style.css', './edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  language = '';
  userData: UserData;
  loading: boolean;
  porfileEdited = false;
  // catching new user data which he updated
  editForm: FormGroup;
  profileImage: string = null;
  constructor(
    private authService: AuthService,
    private langService: LanguageService
  ) {}
  ngOnInit(): void {
    this.language = this.langService.getCurrentLang();
    this.langService.getCurrentLanguage().subscribe((lang) => {
      this.language = lang;
    });
    // check if he is authenticated or not
    if (this.authService.getToken()) {
      // get current data from local storage
      const {
        _id,
        profileImage,
        userName,
        userEmail,
        userPhone,
        userBigCity,
        userCity,
        job,
      } = this.authService.getLocalStorageData();
      this.profileImage = profileImage;
      // extract current data from local storage to append it to form

      this.userData = {
        profileImage,
        _id,
        userName,
        userEmail,
        userPhone,
        userBigCity,
        userCity,
        job,
      };
      this.editForm = new FormGroup({
        userName: new FormControl(userName, [Validators.required]),
        userEmail: new FormControl(userEmail, [
          Validators.required,
          Validators.email,
        ]),
        userPhone: new FormControl(userPhone, [Validators.required]),
        userBigCity: new FormControl(userBigCity, [Validators.required]),
        userCity: new FormControl(userCity, [Validators.required]),
        job: new FormControl(job, [job ? Validators.required : this.fakErr]),
        profileImage: new FormControl(null),
      });
    }
  }
  omImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.profileImage = fileReader.result as string;
    };
    fileReader.readAsDataURL(file);
    this.editForm.patchValue({
      profileImage: file,
    });
    this.editForm.get('profileImage').updateValueAndValidity();
  }
  private fakErr() {
    return null;
  }
  onEdit(): void {
    this.loading = true;
    const {
      profileImage,
      userName,
      userEmail,
      userPhone,
      userBigCity,
      userCity,
      job,
    } = this.editForm.value;
    this.authService.edit(
      profileImage,
      userName,
      userEmail,
      userPhone,
      userBigCity,
      userCity,
      job
    );

    this.porfileEdited = true;
    setTimeout(() => {
      this.porfileEdited = false;
    }, 1200);
  }
  onRest(): void {
    this.profileImage = this.userData.profileImage;
    const { userName, userEmail, userPhone, userBigCity, userCity, job } =
      this.userData;
    this.editForm.patchValue({
      userName,
      userEmail,
      userPhone,
      userBigCity,
      userCity,
      job,
    });
  }
}
