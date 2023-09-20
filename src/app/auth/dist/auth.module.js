"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var reset_password_component_1 = require("./reset-password/reset-password.component");
var forms_1 = require("@angular/forms");
var shared_module_1 = require("./../shared/shared.module");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var signup_component_1 = require("./signup/signup.component");
var signin_component_1 = require("./signin/signin.component");
var core_1 = require("@angular/core");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        core_1.NgModule({
            declarations: [signin_component_1.SigninComponent, signup_component_1.SignupComponent, reset_password_component_1.ResetPassword],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild([
                    { path: 'signin', component: signin_component_1.SigninComponent },
                    { path: 'signup', component: signup_component_1.SignupComponent },
                ]),
            ]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
