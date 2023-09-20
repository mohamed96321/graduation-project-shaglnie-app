"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SearchModule = void 0;
var router_1 = require("@angular/router");
var post_list_module_1 = require("./../create-post/posts-list/post-list.module");
var shared_module_1 = require("./../shared/shared.module");
var users_search_list_component_1 = require("./users-search-list/users-search-list.component");
var search_component_1 = require("./search.component");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var SearchModule = /** @class */ (function () {
    function SearchModule() {
    }
    SearchModule = __decorate([
        core_1.NgModule({
            declarations: [search_component_1.SearchComponent, users_search_list_component_1.UsersSearchList],
            imports: [
                forms_1.FormsModule,
                router_1.RouterModule.forChild([
                    {
                        path: '',
                        component: search_component_1.SearchComponent
                    },
                ]),
                post_list_module_1.PostListModule,
                shared_module_1.SharedModule,
            ]
        })
    ], SearchModule);
    return SearchModule;
}());
exports.SearchModule = SearchModule;
