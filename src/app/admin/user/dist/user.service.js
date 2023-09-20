"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.url = 'http://localhost:3000/api/';
        this.users = [];
        this.UpdatedUsers = new rxjs_1.Subject();
    }
    UserService.prototype.getUsersByPath = function (path) {
        var _this = this;
        this.http
            .get(this.url + path)
            .subscribe(function (resualt) {
            _this.users = resualt.users;
            _this.UpdatedUsers.next(_this.users);
        });
    };
    UserService.prototype.getOnlyUsers = function () {
        var _this = this;
        this.http
            .get(this.url + 'users')
            .subscribe(function (resualt) {
            _this.users = resualt.users;
            _this.UpdatedUsers.next(_this.users);
        });
    };
    UserService.prototype.getUsers = function () {
        return this.users;
    };
    UserService.prototype.getUpdatedUser = function () {
        return this.UpdatedUsers.asObservable();
    };
    UserService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
