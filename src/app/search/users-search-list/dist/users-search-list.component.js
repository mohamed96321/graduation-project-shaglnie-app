"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersSearchList = void 0;
var core_1 = require("@angular/core");
var UsersSearchList = /** @class */ (function () {
    function UsersSearchList(authService, router) {
        this.authService = authService;
        this.router = router;
        this.users = [];
    }
    UsersSearchList.prototype.ngOnInit = function () { };
    // GET THE CREATOR OF POST
    UsersSearchList.prototype.onGetUser = function (id) {
        var activeUserId = this.authService.getLocalStorageData()._id;
        var path = id === activeUserId ? '/profile' : "/profile/" + id;
        this.router.navigate([path]);
    };
    __decorate([
        core_1.Input()
    ], UsersSearchList.prototype, "users");
    UsersSearchList = __decorate([
        core_1.Component({
            selector: 'app-users-search-list',
            templateUrl: './users-search-list.component.html',
            styleUrls: ['./users-search-list.component.css']
        })
    ], UsersSearchList);
    return UsersSearchList;
}());
exports.UsersSearchList = UsersSearchList;
