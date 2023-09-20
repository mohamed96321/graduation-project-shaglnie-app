"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var AuthService = /** @class */ (function () {
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
        this.url = 'http://localhost:3000/api/';
        this.errMsg = new rxjs_1.Subject();
        this.alertMsg = new rxjs_1.Subject();
        this.isAuthenticated = new rxjs_1.Subject();
        this.adminUpdated = new rxjs_1.Subject();
    }
    // save some user information at local stroage of the browser
    AuthService.prototype.save2LocalStorage = function (token, _id, profileImage, userName, userEmail, userPhone, userBigCity, userCity, job, isAdmin) {
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
            localStorage.setItem('isAdmin', isAdmin);
        }
    };
    AuthService.prototype.getIsAdmin = function () {
        var isAdmin = this.getLocalStorageData().isAdmin ? true : false;
        return isAdmin;
    };
    // retun token which is stored at local storage
    AuthService.prototype.getToken = function () {
        this.token = this.getLocalStorageData().token;
        return this.token ? this.token : null;
    };
    // return all information at local storage
    AuthService.prototype.getLocalStorageData = function () {
        var data = localStorage;
        return data;
    };
    // signin function
    AuthService.prototype.signin = function (userEmail, userPassword) {
        var _this = this;
        this.http
            .post(this.url + 'user' + '/signin', {
            userEmail: userEmail,
            userPassword: userPassword
        })
            .subscribe(function (signinResponse) {
            // if email and password is valid
            if (signinResponse.token) {
                _this.token = signinResponse.token;
                var token = _this.token;
                var _a = signinResponse.user, _id = _a._id, profileImage = _a.profileImage, userName = _a.userName, userEmail_1 = _a.userEmail, userPhone = _a.userPhone, userBigCity = _a.userBigCity, userCity = _a.userCity, job = _a.job, isAdmin = _a.isAdmin;
                _this.isAuthenticated.next(true);
                if (isAdmin === true) {
                    console.log('is admin' + isAdmin);
                    _this.adminUpdated.next(true);
                }
                _this.save2LocalStorage(token, _id, profileImage, userName, userEmail_1, userPhone, userBigCity, userCity, job, isAdmin);
                _this.router.navigate(['/profile']);
            }
            else {
                _this.errMsg.next('الايميل او الرقم السري غير صحيح');
            }
        }, function (err) {
            _this.errMsg.next('يرجي المحاوله وقت اخر');
        });
    };
    // get specific user by it's id
    AuthService.prototype.getUserById = function (id) {
        return this.http.get(this.url + 'user/' + id);
    };
    // signup function
    AuthService.prototype.signup = function (userName, userEmail, userPhone, userBigCity, userCity, userPassword, isWorker, job, workerIdentityImages) {
        var _this = this;
        var formData = new FormData();
        formData.append('userName', userName);
        formData.append('userEmail', userEmail);
        formData.append('userPhone', userPhone);
        formData.append('userBigCity', userBigCity);
        formData.append('userCity', userCity);
        formData.append('userPassword', userPassword);
        formData.append('isWorker', isWorker);
        if (job) {
            formData.append('job', job);
            for (var image in workerIdentityImages) {
                formData.append('workerIdentityImages', workerIdentityImages[image]);
            }
        }
        this.http
            .post(this.url + 'user/signup', formData)
            .subscribe(function (signUpResponse) {
            if (signUpResponse.token) {
                _this.token = signUpResponse.token;
                _this.isAuthenticated.next(true);
                var _a = signUpResponse.user, _id = _a._id, profileImage = _a.profileImage, userName_1 = _a.userName, userEmail_2 = _a.userEmail, userPhone_1 = _a.userPhone, userBigCity_1 = _a.userBigCity, userCity_1 = _a.userCity, job_1 = _a.job;
                _this.save2LocalStorage(_this.token, _id, profileImage, userName_1, userEmail_2, userPhone_1, userBigCity_1, userCity_1, job_1);
                _this.router.navigate(['/profile']);
            }
            else if (signUpResponse.duplicatedEamil) {
                _this.errMsg.next('الايميل مستخدم من قبل');
                _this.router.navigate(['/auth', 'signup']);
            }
            else {
                _this.alertMsg.next('يمكنك التسجيل بعد التاكد من الهويه');
            }
        }, function (err) {
            _this.errMsg.next('يرجي المحاوله وقت اخر');
        });
    };
    // edit profile data basic inforamtion
    AuthService.prototype.edit = function (profileImage, userName, userEmail, userPhone, userBigCity, userCity, job) {
        var formData = new FormData();
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
            .subscribe(function (resualt) {
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
    };
    //====================
    AuthService.prototype.onAcceptWorker = function (id) {
        return this.http.patch(this.url + 'worker/acceptWorker/' + id, {});
    };
    //====================
    AuthService.prototype.onDeleteUserById = function (id) {
        return this.http["delete"](this.url + 'user/' + id);
    };
    // logging out
    AuthService.prototype.logout = function () {
        var currentLanguage = localStorage.getItem('lang');
        localStorage.clear();
        localStorage.setItem('lang', currentLanguage);
        this.isAuthenticated.next(false);
        this.adminUpdated.next(false);
        this.router.navigate(['/']);
    };
    // return authentication state true or false
    AuthService.prototype.isAuthenticatedUser = function () {
        return this.isAuthenticated.asObservable();
    };
    /**  */
    AuthService.prototype.isAdminUpdated = function () {
        return this.adminUpdated.asObservable();
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
