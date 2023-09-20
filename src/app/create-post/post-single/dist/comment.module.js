"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommentModule = void 0;
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var create_comment_component_1 = require("./create-comment/create-comment.component");
var comments_list_component_1 = require("./comments-list/comments-list.component");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var CommentModule = /** @class */ (function () {
    function CommentModule() {
    }
    CommentModule = __decorate([
        core_1.NgModule({
            declarations: [comments_list_component_1.CommentsListComponent, create_comment_component_1.CreateCommentComponent],
            imports: [forms_1.ReactiveFormsModule, common_1.CommonModule, router_1.RouterModule],
            exports: [comments_list_component_1.CommentsListComponent, create_comment_component_1.CreateCommentComponent, common_1.CommonModule]
        })
    ], CommentModule);
    return CommentModule;
}());
exports.CommentModule = CommentModule;
