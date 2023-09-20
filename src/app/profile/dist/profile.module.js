"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileModule = void 0;
var router_1 = require("@angular/router");
var post_list_module_1 = require("../create-post/posts-list/post-list.module");
var forms_1 = require("@angular/forms");
var testimonial_module_1 = require("./../home/testimonial/testimonial.module");
var shared_module_1 = require("./../shared/shared.module");
var edit_profile_component_1 = require("./edit-profile/edit-profile.component");
var view_profile_component_1 = require("./view-profile/view-profile.component");
var profile_data_component_1 = require("./profile-data/profile-data.component");
var profile_component_1 = require("./profile.component");
var core_1 = require("@angular/core");
var auth_guard_1 = require("../auth/auth.guard");
var ProfileModule = /** @class */ (function () {
    function ProfileModule() {
    }
    ProfileModule = __decorate([
        core_1.NgModule({
            declarations: [
                profile_component_1.ProfileComponent,
                profile_data_component_1.ProfileDataComponent,
                view_profile_component_1.ViewProfileComponent,
                edit_profile_component_1.EditProfileComponent,
            ],
            imports: [
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forChild([
                    {
                        path: '',
                        canActivate: [auth_guard_1.AuthGuard],
                        component: profile_component_1.ProfileComponent
                    },
                    {
                        path: 'edit',
                        canActivate: [auth_guard_1.AuthGuard],
                        component: edit_profile_component_1.EditProfileComponent
                    },
                    {
                        path: ':id',
                        component: view_profile_component_1.ViewProfileComponent
                    },
                ]),
                testimonial_module_1.TestimonialModule,
                post_list_module_1.PostListModule,
                shared_module_1.SharedModule,
            ]
        })
    ], ProfileModule);
    return ProfileModule;
}());
exports.ProfileModule = ProfileModule;
