"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileComponent = void 0;
var core_1 = require("@angular/core");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(authService, postService, testimonialService, langService) {
        this.authService = authService;
        this.postService = postService;
        this.testimonialService = testimonialService;
        this.langService = langService;
        this.language = '';
        this.loading = false;
        this.err = null;
        this.isAdminSaved = false;
        this.userPosts = [];
        this.userData = {
            profileImage: '',
            _id: '',
            userName: '',
            userEmail: '',
            userPhone: '',
            userBigCity: '',
            userCity: '',
            job: ''
        };
        this.userReviews = [];
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.language = this.langService.getCurrentLang();
        this.langService.getCurrentLanguage().subscribe(function (lang) {
            _this.language = lang;
        });
        this.loading = true;
        this.isAdminSaved = this.authService.getIsAdmin();
        this.postService.getUpdatedPosts().subscribe(function (posts) {
            _this.userPosts = posts;
        });
        var userId = this.authService.getLocalStorageData()._id;
        this.authService.getUserById(userId).subscribe(function (getUserResponse) {
            if (getUserResponse) {
                _this.userData = getUserResponse.user;
                _this.userPosts = getUserResponse.userPosts;
                _this.postService.init(_this.userPosts);
                _this.loading = false;
            }
        }, function (err) {
            _this.loading = false;
            _this.err = 'لا يوجد اتصال بالانترنت';
        });
        this.testimonialService.getReview(userId);
        this.testimonialService.getUpdatedTestimonials().subscribe(function (testis) {
            _this.userReviews = testis;
        });
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.css']
        })
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
