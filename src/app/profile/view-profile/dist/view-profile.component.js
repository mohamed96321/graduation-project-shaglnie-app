"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ViewProfileComponent = void 0;
var core_1 = require("@angular/core");
var ViewProfileComponent = /** @class */ (function () {
    function ViewProfileComponent(route, router, authService, testimonialService, reportService, langService) {
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.testimonialService = testimonialService;
        this.reportService = reportService;
        this.langService = langService;
        this.language = '';
        this.userId = '';
        this.userPosts = [];
        this.userReviews = [];
        this.isAuth = false;
        this.isAdminSaved = false;
        this.userData = {
            profileImage: '',
            _id: '',
            userName: '',
            userEmail: '',
            userPhone: '',
            userBigCity: '',
            userCity: '',
            job: '',
            workerIdentityImages: ['']
        };
    }
    ViewProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.language = this.langService.getCurrentLang();
        this.langService.getCurrentLanguage().subscribe(function (lang) {
            _this.language = lang;
        });
        this.isAuth = this.authService.getToken() ? true : false;
        this.isAdminSaved = this.authService.getIsAdmin();
        this.route.params.subscribe(function (params) {
            _this.userId = params['id'];
        });
        this.authService
            .getUserById(this.userId)
            .subscribe(function (getUserResualt) {
            _this.userData = getUserResualt.user;
            _this.userPosts = getUserResualt.userPosts;
            console.log(_this.userPosts);
        });
        this.testimonialService.getReview(this.userId);
        this.testimonialService.getUpdatedTestimonials().subscribe(function (testis) {
            _this.userReviews = testis;
        });
    };
    ViewProfileComponent.prototype.acceptWorker = function () {
        var _this = this;
        this.authService.onAcceptWorker(this.userId).subscribe(function (resualt) {
            _this.userData.accepted = true;
            console.log(resualt);
        });
    };
    ViewProfileComponent.prototype.deleteUser = function () {
        var _this = this;
        var confirm = window.confirm('سوف يتم حذف الحساب ');
        confirm
            ? this.authService.onDeleteUserById(this.userId).subscribe(function (resualt) {
                console.log(resualt);
                _this.router.navigate(['/admin/statistic']);
            })
            : null;
    };
    ViewProfileComponent.prototype.onAddReport = function (f) {
        var reportMessage = f.value['reportMessage'];
        this.reportService.addReport(reportMessage, this.userId);
        f.reset();
    };
    ViewProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-view-profile',
            templateUrl: './view-profile.component.html',
            styleUrls: ['./view-profile.component.css']
        })
    ], ViewProfileComponent);
    return ViewProfileComponent;
}());
exports.ViewProfileComponent = ViewProfileComponent;
