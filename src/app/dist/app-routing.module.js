"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var admin_auth_guard_1 = require("./admin/admin-auth.guard");
var user_guard_1 = require("./auth/user.guard");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var error_page_component_1 = require("./error-page/error-page.component");
var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./home/home.module'); }).then(function (m) { return m.HomeModule; }); }
    },
    {
        path: 'auth',
        canActivate: [user_guard_1.AuthUser],
        loadChildren: function () { return Promise.resolve().then(function () { return require('./auth/auth.module'); }).then(function (m) { return m.AuthModule; }); }
    },
    {
        path: 'profile',
        loadChildren: function () {
            return Promise.resolve().then(function () { return require('./profile/profile.module'); }).then(function (m) { return m.ProfileModule; });
        }
    },
    {
        path: 'post',
        loadChildren: function () {
            return Promise.resolve().then(function () { return require('./create-post/post.module'); }).then(function (m) { return m.PostModule; });
        }
    },
    {
        path: 'admin',
        canActivate: [admin_auth_guard_1.AdminAuthGuard],
        loadChildren: function () {
            return Promise.resolve().then(function () { return require('./admin/admin.module'); }).then(function (m) { return m.AddminModule; });
        }
    },
    { path: 'error-page', component: error_page_component_1.ErrorPageComponent },
    { path: '**', redirectTo: 'error-page' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes, { preloadingStrategy: router_1.PreloadAllModules }),
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
