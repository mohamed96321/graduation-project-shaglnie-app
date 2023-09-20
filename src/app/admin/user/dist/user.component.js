"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserComponent = void 0;
var core_1 = require("@angular/core");
var UserComponent = /** @class */ (function () {
    function UserComponent(userService, langService) {
        this.userService = userService;
        this.langService = langService;
        this.users = [];
        this.language = '';
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.language = this.langService.getCurrentLang();
        this.langService.getCurrentLanguage().subscribe(function (lang) {
            _this.language = lang;
        });
        this.userService.getUsersByPath('user');
        this.users = this.userService.getUsers();
        this.userService.getUpdatedUser().subscribe(function (users) {
            _this.users = users;
            console.log(_this.users);
        });
    };
    UserComponent.prototype.getUsers = function (path) {
        this.userService.getUsersByPath(path);
    };
    UserComponent.prototype.onGetUserByEmail = function (f) {
        var user = this.users.find(function (u) { return u.userEmail === f.value.email; });
        this.users = [user];
    };
    UserComponent = __decorate([
        core_1.Component({
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.css']
        })
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
