import { Post } from 'src/app/create-post/post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
export interface UserData {
  _id: string;
  profileImage: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userBigCity: string;
  userCity: string;
  accepted?: boolean;
  workerIdentityImages?: string[];
  job?: string;
  isAdmin?: string | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = 'http://localhost:3000/api/';
  errMsg = new Subject<string>();
  alertMsg = new Subject<string>();
  private isAuthenticated = new Subject<boolean>();
  private adminUpdated = new Subject<boolean>();
  private token: string;
  constructor(public http: HttpClient, public router: Router) {}
  // save some user information at local stroage of the browser
  private save2LocalStorage(
    token: string,
    _id: string,
    profileImage: string,
    userName: string,
    userEmail: string,
    userPhone: string,
    userBigCity: string,
    userCity: string,
    job?: string,
    isAdmin?: string | boolean
  ): void {
    localStorage.setItem('token', token);
    localStorage.setItem('_id', _id);
    localStorage.setItem('profileImage', profileImage);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('userPhone', userPhone);
    localStorage.setItem('userBigCity', userBigCity);
    localStorage.setItem('userCity', userCity);
    if (job != undefined || job != null) {
      localStorage.setItem('job', job);
    }
    if (isAdmin != undefined || isAdmin != null) {
      localStorage.setItem('isAdmin', isAdmin as string);
    }
  }
  getIsAdmin() {
    const isAdmin = this.getLocalStorageData().isAdmin ? true : false;
    return isAdmin;
  }
  // retun token which is stored at local storage
  public getToken(): string | false {
    this.token = this.getLocalStorageData().token;
    return this.token ? this.token : null;
  }
  // return all information at local storage
  public getLocalStorageData(): {
    token: string;
    _id: string;
    profileImage: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    userBigCity: string;
    userCity: string;
    job?: string;
    isAdmin?: boolean;
  } {
    const data = <
      {
        token: string;
        _id: string;
        profileImage: string;
        userName: string;
        userEmail: string;
        userPhone: string;
        userBigCity: string;
        userCity: string;
        job?: string;
      }
    >(<unknown>localStorage);
    return data;
  }
  // signin function
  signin(userEmail: string, userPassword: string): void {
    this.http
      .post(this.url + 'user' + '/signin', {
        userEmail,
        userPassword,
      })
      .subscribe(
        (signinResponse: {
          message: string;
          token: string;
          user: UserData;
        }) => {
          // if email and password is valid
          if (signinResponse.token) {
            this.token = signinResponse.token;
            const token = this.token;
            const {
              _id,
              profileImage,
              userName,
              userEmail,
              userPhone,
              userBigCity,
              userCity,
              job,
              isAdmin,
            } = signinResponse.user;
            this.isAuthenticated.next(true);

            if (isAdmin === true) {
              console.log('is admin' + isAdmin);

              this.adminUpdated.next(true);
            }
            this.save2LocalStorage(
              token,
              _id,
              profileImage,
              userName,
              userEmail,
              userPhone,
              userBigCity,
              userCity,
              job,
              isAdmin
            );
            this.router.navigate(['/profile']);
          } else {
            this.errMsg.next('الايميل او الرقم السري غير صحيح');
          }
        },
        (err) => {
          this.errMsg.next('يرجي المحاوله وقت اخر');
        }
      );
  }
  // get specific user by it's id
  getUserById(id: string): Observable<{
    message: string;
    user: UserData;
    userPosts: Post[];
  }> {
    return this.http.get<{
      message: string;
      user: UserData;
      userPosts: Post[];
    }>(this.url + 'user/' + id);
  }
  // signup function
  signup(
    userName: string,
    userEmail: string,
    userPhone: string,
    userBigCity: string,
    userCity: string,
    userPassword: string,
    isWorker: string,
    job?: string,
    workerIdentityImages?: FileList
  ) {
    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('userEmail', userEmail);
    formData.append('userPhone', userPhone);
    formData.append('userBigCity', userBigCity);
    formData.append('userCity', userCity);
    formData.append('userPassword', userPassword);
    formData.append('isWorker', isWorker);
    if (job) {
      formData.append('job', job);
      for (const image in workerIdentityImages) {
        formData.append('workerIdentityImages', workerIdentityImages[image]);
      }
    }

    this.http
      .post<{ message: string; token: string }>(
        this.url + 'user/signup',
        formData
      )
      .subscribe(
        (signUpResponse: {
          message: string;
          token: string;
          user: UserData;
          duplicatedEamil?: boolean;
        }) => {
          if (signUpResponse.token) {
            this.token = signUpResponse.token;
            this.isAuthenticated.next(true);
            const {
              _id,
              profileImage,
              userName,
              userEmail,
              userPhone,
              userBigCity,
              userCity,
              job,
            } = signUpResponse.user;
            this.save2LocalStorage(
              this.token,
              _id,
              profileImage,
              userName,
              userEmail,
              userPhone,
              userBigCity,
              userCity,
              job
            );
            this.router.navigate(['/profile']);
          } else if (signUpResponse.duplicatedEamil) {
            this.errMsg.next('الايميل مستخدم من قبل');
            this.router.navigate(['/auth', 'signup']);
          } else {
            this.alertMsg.next('يمكنك التسجيل بعد التاكد من الهويه');
          }
        },
        (err) => {
          this.errMsg.next('يرجي المحاوله وقت اخر');
        }
      );
  }

  // edit profile data basic inforamtion
  edit(
    profileImage: File,
    userName: string,
    userEmail: string,
    userPhone: string,
    userBigCity: string,
    userCity: string,
    job: string
  ) {
    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('userEmail', userEmail);
    formData.append('userPhone', userPhone);
    formData.append('userBigCity', userBigCity);
    formData.append('userCity', userCity);
    if (job) {
      formData.append('job', job);
    }
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    this.http
      .patch(this.url + 'user/edit/', formData)
      .subscribe((resualt: { message: string; newUser: UserData }) => {
        if (resualt) {
          localStorage.setItem('userName', userName);
          localStorage.setItem('userEmail', userEmail);
          localStorage.setItem('userPhone', userPhone);
          localStorage.setItem('userBigCity', userBigCity);
          localStorage.setItem('userCity', userCity);
          if (job != undefined || job != null) {
            localStorage.setItem('job', job);
          }
          localStorage.setItem('profileImage', resualt.newUser.profileImage);
        }
      });
  }
  //====================
  onAcceptWorker(id: string) {
    return this.http.patch(this.url + 'worker/acceptWorker/' + id, {});
  }
  //====================
  onDeleteUserById(id: string) {
    return this.http.delete(this.url + 'user/' + id);
  }
  // logging out
  logout(): void {
    const currentLanguage = localStorage.getItem('lang');
    localStorage.clear();
    localStorage.setItem('lang', currentLanguage);
    this.isAuthenticated.next(false);
    this.adminUpdated.next(false);
    this.router.navigate(['/']);
  }
  // return authentication state true or false
  isAuthenticatedUser(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
  /**  */
  isAdminUpdated(): Observable<boolean> {
    return this.adminUpdated.asObservable();
  }
}
