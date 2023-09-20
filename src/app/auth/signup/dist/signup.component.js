"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignupComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var SignupComponent = /** @class */ (function () {
    function SignupComponent(authService, langService) {
        this.authService = authService;
        this.langService = langService;
        this.language = '';
        this.imagesPreview = [];
        this.isWorker = false;
        this.userFormControl = {
            userName: new forms_1.FormControl(null, [forms_1.Validators.required]),
            userEmail: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.email]),
            userPhone: new forms_1.FormControl(null, [forms_1.Validators.required]),
            userBigCity: new forms_1.FormControl(null, [forms_1.Validators.required]),
            userCity: new forms_1.FormControl(null, [forms_1.Validators.required]),
            userPassword: new forms_1.FormControl(null, [forms_1.Validators.required]),
            isWorker: new forms_1.FormControl(false)
        };
    }
    SignupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.language = this.langService.getCurrentLang();
        this.langService.getCurrentLanguage().subscribe(function (lang) {
            _this.language = lang;
        });
        this.loading = false;
        // initial signup form
        this.signupForm = new forms_1.FormGroup(__assign({}, this.userFormControl));
    };
    SignupComponent.prototype.onChangeUser = function () {
        this.isWorker = !this.isWorker;
        if (this.isWorker) {
            this.signupForm = new forms_1.FormGroup(__assign(__assign({}, this.userFormControl), { job: new forms_1.FormControl(null, [forms_1.Validators.required]), workerIdentityImages: new forms_1.FormControl(null, [forms_1.Validators.required]) }));
        }
        else {
            this.signupForm = new forms_1.FormGroup(__assign({}, this.userFormControl));
        }
    };
    SignupComponent.prototype.onImagesPicked = function (event) {
        var _this = this;
        this.imagesPreview = [];
        var files = event.target.files;
        this.signupForm.patchValue({
            workerIdentityImages: files
        });
        this.signupForm.get('workerIdentityImages').updateValueAndValidity();
        var _loop_1 = function (file) {
            var fileReader = new FileReader();
            fileReader.onload = function () {
                _this.imagesPreview.push(fileReader.result);
            };
            fileReader.readAsDataURL(files[file]);
        };
        for (var file in files) {
            _loop_1(file);
        }
    };
    SignupComponent.prototype.onSignup = function () {
        var _this = this;
        if (this.signupForm.valid) {
            this.loading = true;
            var _a = this.signupForm.value, userName = _a.userName, userEmail = _a.userEmail, userPhone = _a.userPhone, userBigCity = _a.userBigCity, userCity = _a.userCity, userPassword = _a.userPassword, isWorker = _a.isWorker, job = _a.job, workerIdentityImages = _a.workerIdentityImages;
            console.log(this.signupForm.value);
            this.authService.signup(userName, userEmail, userPhone, userBigCity, userCity, userPassword, isWorker, job, workerIdentityImages);
            this.authService.errMsg.subscribe(function (errMsg) {
                _this.errorMsg = errMsg;
                _this.loading = false;
                _this.signupForm.patchValue({
                    userEmail: null
                });
                _this.signupForm.get('userEmail').updateValueAndValidity();
            });
            this.authService.alertMsg.subscribe(function (alertMsg) {
                _this.signupForm.reset();
                _this.alertMsg = alertMsg;
                _this.loading = false;
            });
        }
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['../shared-style.css', './signup.component.css']
        })
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
