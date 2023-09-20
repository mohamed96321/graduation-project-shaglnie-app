"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreatePostModule = void 0;
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var shared_module_1 = require("./../shared/shared.module");
var create_post_component_1 = require("./create-post.component");
var core_1 = require("@angular/core");
var CreatePostModule = /** @class */ (function () {
    function CreatePostModule() {
    }
    CreatePostModule = __decorate([
        core_1.NgModule({
            declarations: [create_post_component_1.CreatePostComponent],
            imports: [
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forChild([
                    {
                        path: '',
                        component: create_post_component_1.CreatePostComponent
                    },
                ]),
                shared_module_1.SharedModule,
            ]
        })
    ], CreatePostModule);
    return CreatePostModule;
}());
exports.CreatePostModule = CreatePostModule;
