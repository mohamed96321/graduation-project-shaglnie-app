"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreatePostComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CreatePostComponent = /** @class */ (function () {
    function CreatePostComponent(authService, postService, socketIOService, langService) {
        this.authService = authService;
        this.postService = postService;
        this.socketIOService = socketIOService;
        this.langService = langService;
        this.language = '';
        this.postCreated = false;
        this.loading = false;
        this.errorMessage = null;
        this.postImages = [];
    }
    CreatePostComponent.prototype.ngOnInit = function () {
        var _this = this;
        // languages
        this.language = this.langService.getCurrentLang();
        this.langService.getCurrentLanguage().subscribe(function (lang) {
            _this.language = lang;
        });
        // get user info form loacal storage`
        if (this.authService.getToken) {
            var _a = this.authService.getLocalStorageData(), userBigCity_1 = _a.userBigCity, userCity_1 = _a.userCity, userPhone_1 = _a.userPhone, job_1 = _a.job;
            this.userData = {
                userBigCity: userBigCity_1,
                userCity: userCity_1,
                userPhone: userPhone_1,
                job: job_1
            };
        }
        // initialize post information if there is user
        var _b = this.userData, userBigCity = _b.userBigCity, userCity = _b.userCity, userPhone = _b.userPhone, job = _b.job;
        this.postForm = new forms_1.FormGroup({
            job: new forms_1.FormControl(job, [forms_1.Validators.required]),
            creatorBigCity: new forms_1.FormControl(userBigCity, [forms_1.Validators.required]),
            creatorCity: new forms_1.FormControl(userCity, [forms_1.Validators.required]),
            creatorPhone: new forms_1.FormControl(userPhone, [forms_1.Validators.required]),
            postText: new forms_1.FormControl(null, [forms_1.Validators.required]),
            createByWorker: new forms_1.FormControl(false),
            postImages: new forms_1.FormControl(null)
        });
    };
    // capture posts images on front end
    CreatePostComponent.prototype.onImagesPicked = function (event) {
        var _this = this;
        this.postImages = [];
        var files = event.target.files;
        this.postForm.patchValue({
            postImages: files
        });
        this.postForm.get('postImages').updateValueAndValidity();
        var _loop_1 = function (file) {
            var fileReader = new FileReader();
            fileReader.onload = function () {
                _this.postImages.push(fileReader.result);
            };
            fileReader.readAsDataURL(files[file]);
        };
        for (var file in files) {
            _loop_1(file);
        }
    };
    CreatePostComponent.prototype.onAddPost = function () {
        var _this = this;
        if (this.postForm.valid) {
            this.loading = true;
            this.errorMessage = null;
            var _a = this.postForm.value, creatorPhone_1 = _a.creatorPhone, creatorBigCity_1 = _a.creatorBigCity, creatorCity_1 = _a.creatorCity, job = _a.job, postText = _a.postText, createByWorker = _a.createByWorker, postImages = _a.postImages;
            this.postService
                .addPost(job, creatorPhone_1, creatorBigCity_1, creatorCity_1, postText, postImages, createByWorker)
                .subscribe(function (resualt) {
                console.log(resualt);
                _this.socketIOService.onAddPost(resualt.newPost);
                _this.postCreated = true;
                _this.loading = false;
                _this.errorMessage = null;
                _this.postForm.reset();
                _this.postForm.patchValue({
                    creatorBigCity: creatorBigCity_1,
                    creatorCity: creatorCity_1,
                    creatorPhone: creatorPhone_1,
                    createByWorker: false
                });
                _this.postForm.get('createByWorker').updateValueAndValidity();
                _this.postForm.get('creatorBigCity').updateValueAndValidity();
                _this.postImages = [];
                setTimeout(function () {
                    _this.postCreated = false;
                }, 1000);
            }, function (e) {
                if (e.status === 401) {
                    _this.errorMessage = 'برجاء تسجيل الدخول اولا';
                }
                else {
                    _this.errorMessage = 'برجاء المحاوله وقت اخر';
                }
                _this.loading = false;
                _this.postCreated = false;
                setTimeout(function () {
                    _this.errorMessage = null;
                }, 2000);
            });
        }
    };
    CreatePostComponent.prototype.onReload = function () {
        this.errorMessage = null;
        this.loading = false;
    };
    CreatePostComponent = __decorate([
        core_1.Component({
            selector: 'app-create-post',
            templateUrl: './create-post.component.html',
            styleUrls: [
                '../auth/signin/signin.component.css',
                './create-post.component.css',
            ]
        })
    ], CreatePostComponent);
    return CreatePostComponent;
}());
exports.CreatePostComponent = CreatePostComponent;
