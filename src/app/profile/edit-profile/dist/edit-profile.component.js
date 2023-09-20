"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditProfileComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EditProfileComponent = /** @class */ (function () {
    function EditProfileComponent(authService, langService) {
        this.authService = authService;
        this.langService = langService;
        this.language = '';
        this.porfileEdited = false;
        this.profileImage = null;
    }
    EditProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.language = this.langService.getCurrentLang();
        this.langService.getCurrentLanguage().subscribe(function (lang) {
            _this.language = lang;
        });
        // check if he is authenticated or not
        if (this.authService.getToken()) {
            // get current data from local storage
            var _a = this.authService.getLocalStorageData(), _id = _a._id, profileImage = _a.profileImage, userName = _a.userName, userEmail = _a.userEmail, userPhone = _a.userPhone, userBigCity = _a.userBigCity, userCity = _a.userCity, job = _a.job;
            this.profileImage = profileImage;
            // extract current data from local storage to append it to form
            this.userData = {
                profileImage: profileImage,
                _id: _id,
                userName: userName,
                userEmail: userEmail,
                userPhone: userPhone,
                userBigCity: userBigCity,
                userCity: userCity,
                job: job
            };
            this.editForm = new forms_1.FormGroup({
                userName: new forms_1.FormControl(userName, [forms_1.Validators.required]),
                userEmail: new forms_1.FormControl(userEmail, [
                    forms_1.Validators.required,
                    forms_1.Validators.email,
                ]),
                userPhone: new forms_1.FormControl(userPhone, [forms_1.Validators.required]),
                userBigCity: new forms_1.FormControl(userBigCity, [forms_1.Validators.required]),
                userCity: new forms_1.FormControl(userCity, [forms_1.Validators.required]),
                job: new forms_1.FormControl(job, [job ? forms_1.Validators.required : this.fakErr]),
                profileImage: new forms_1.FormControl(null)
            });
        }
    };
    EditProfileComponent.prototype.omImagePicked = function (event) {
        var _this = this;
        var file = event.target.files[0];
        var fileReader = new FileReader();
        fileReader.onload = function () {
            _this.profileImage = fileReader.result;
        };
        fileReader.readAsDataURL(file);
        this.editForm.patchValue({
            profileImage: file
        });
        this.editForm.get('profileImage').updateValueAndValidity();
    };
    EditProfileComponent.prototype.fakErr = function () {
        return null;
    };
    EditProfileComponent.prototype.onEdit = function () {
        var _this = this;
        this.loading = true;
        var _a = this.editForm.value, profileImage = _a.profileImage, userName = _a.userName, userEmail = _a.userEmail, userPhone = _a.userPhone, userBigCity = _a.userBigCity, userCity = _a.userCity, job = _a.job;
        this.authService.edit(profileImage, userName, userEmail, userPhone, userBigCity, userCity, job);
        this.porfileEdited = true;
        setTimeout(function () {
            _this.porfileEdited = false;
        }, 1200);
    };
    EditProfileComponent.prototype.onRest = function () {
        this.profileImage = this.userData.profileImage;
        var _a = this.userData, userName = _a.userName, userEmail = _a.userEmail, userPhone = _a.userPhone, userBigCity = _a.userBigCity, userCity = _a.userCity, job = _a.job;
        this.editForm.patchValue({
            userName: userName,
            userEmail: userEmail,
            userPhone: userPhone,
            userBigCity: userBigCity,
            userCity: userCity,
            job: job
        });
    };
    EditProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-profile',
            templateUrl: './edit-profile.component.html',
            styleUrls: ['../../auth/shared-style.css', './edit-profile.component.css']
        })
    ], EditProfileComponent);
    return EditProfileComponent;
}());
exports.EditProfileComponent = EditProfileComponent;
