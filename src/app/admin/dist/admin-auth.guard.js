"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminAuthGuard = void 0;
var core_1 = require("@angular/core");
var AdminAuthGuard = /** @class */ (function () {
    function AdminAuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AdminAuthGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        // throw new Error('Method not implemented.');
        var token = this.authService.getToken();
        var isAdmin = this.authService.getLocalStorageData().isAdmin
            ? true
            : false;
        return new Promise(function (resolve, reject) {
            if (token && isAdmin) {
                resolve(true);
            }
            else {
                _this.router.navigate(['/error-page']);
            }
        });
    };
    AdminAuthGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AdminAuthGuard);
    return AdminAuthGuard;
}());
exports.AdminAuthGuard = AdminAuthGuard;
