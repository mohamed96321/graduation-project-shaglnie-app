"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignupModule = void 0;
var router_1 = require("@angular/router");
var signup_component_1 = require("./signup.component");
var forms_1 = require("@angular/forms");
var shared_module_1 = require("./../../shared/shared.module");
var core_1 = require("@angular/core");
var SignupModule = /** @class */ (function () {
    function SignupModule() {
    }
    SignupModule = __decorate([
        core_1.NgModule({
            declarations: [signup_component_1.SignupComponent],
            imports: [forms_1.ReactiveFormsModule, router_1.RouterModule, shared_module_1.SharedModule]
        })
    ], SignupModule);
    return SignupModule;
}());
exports.SignupModule = SignupModule;
