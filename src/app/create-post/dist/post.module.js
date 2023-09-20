"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostModule = void 0;
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var PostModule = /** @class */ (function () {
    function PostModule() {
    }
    PostModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild([
                    {
                        path: 'timeline',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('../jobs/jobs.module'); }).then(function (m) { return m.JobsModule; });
                        }
                    },
                    {
                        path: 'search',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('../search/search.module'); }).then(function (m) { return m.SearchModule; });
                        }
                    },
                    {
                        path: 'create',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./create-post.module'); }).then(function (m) { return m.CreatePostModule; });
                        }
                    },
                    {
                        path: ':postId',
                        loadChildren: function () {
                            return Promise.resolve().then(function () { return require('./post-single/post-single.module'); }).then(function (m) { return m.PostSingleModule; });
                        }
                    },
                ]),
            ]
        })
    ], PostModule);
    return PostModule;
}());
exports.PostModule = PostModule;
