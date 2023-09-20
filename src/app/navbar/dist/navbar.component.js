"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavbarComponent = void 0;
var core_1 = require("@angular/core");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(authService, langService) {
        this.authService = authService;
        this.langService = langService;
        this.lang = 'عربي';
        this.language = 'arb';
        this.isAuthenticated = false;
        this.isAdmin = false;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        // check language
        this.language = this.langService.getCurrentLang();
        this.langService.getCurrentLanguage().subscribe(function (lang) {
            _this.language = lang;
        });
        this.lang = this.language === 'arb' ? 'English' : 'عربي';
        // get user state if user or not
        // by checking if there is token in local stroage
        this.isAdmin = this.authService.getLocalStorageData().isAdmin
            ? true
            : false;
        this.authService.isAdminUpdated().subscribe(function (isAdmin) {
            _this.isAdmin = isAdmin ? true : false;
        });
        this.isAuthenticated = this.authService.getToken() ? true : false;
        // update user state at run time
        this.authService.isAuthenticatedUser().subscribe(function (isAuth) {
            _this.isAuthenticated = isAuth ? true : false;
        });
    };
    //on change language
    NavbarComponent.prototype.onChangeLlanguage = function () {
        this.langService.changeLang();
        this.lang = this.language === 'arb' ? 'English' : 'عربي';
    };
    // logout form site
    NavbarComponent.prototype.onLogout = function () {
        this.authService.logout();
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'app-navbar',
            templateUrl: './navbar.component.html',
            styleUrls: ['./navbar.component.css']
        })
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
