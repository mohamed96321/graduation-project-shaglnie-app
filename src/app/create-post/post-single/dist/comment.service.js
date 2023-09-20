"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommentService = void 0;
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var CommentService = /** @class */ (function () {
    function CommentService(http, authService, socketIoService) {
        this.http = http;
        this.authService = authService;
        this.socketIoService = socketIoService;
        this.comments = [];
        this.updatedComments = new rxjs_1.Subject();
    }
    CommentService.prototype.initComments = function (initialComments) {
        this.comments = initialComments;
        this.updatedComments.next(this.comments);
    };
    CommentService.prototype.addComment = function (postId, commentText, commentImages) {
        var _this = this;
        var formData = new FormData();
        formData.append('commentText', commentText);
        if (commentImages) {
            for (var index in commentImages) {
                formData.append('commentImages', commentImages[index]);
            }
        }
        this.http
            .post('http://localhost:3000/api/comment/addComment/' + postId, formData)
            .subscribe(function (resualt) {
            var _a = _this.authService.getLocalStorageData(), _id = _a._id, userName = _a.userName, profileImage = _a.profileImage;
            var newComment = __assign(__assign({}, resualt.newComment), { creator: { _id: _id, userName: userName, profileImage: profileImage } });
            _this.comments.push(newComment);
            _this.updatedComments.next(_this.comments);
            _this.socketIoService.onAddComment(newComment, 'postid=' + postId);
        });
    };
    CommentService.prototype.deleteComment = function (commentId, postId) {
        this.deleteCommentIo(commentId);
        this.http["delete"]('http://localhost:3000/api/comment/' + commentId)
            .subscribe(function (message) { });
        this.socketIoService.onDeleteComment(commentId, 'postid=' + postId);
    };
    CommentService.prototype.deleteCommentIo = function (commentId) {
        var commentIndex = this.comments.findIndex(function (comment) { return comment._id === commentId; });
        this.comments.splice(commentIndex, 1);
        this.updatedComments.next(this.comments);
    };
    CommentService.prototype.addCommentIo = function (comment) {
        this.comments.push(comment);
        this.updatedComments.next(this.comments);
    };
    // get comments
    CommentService.prototype.getComments = function () {
        return this.comments;
    };
    //LISTEN TO updatedComments OF ANY USER ADD NEW COMMENT
    CommentService.prototype.getUpdatedComments = function () {
        return this.updatedComments.asObservable();
    };
    CommentService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], CommentService);
    return CommentService;
}());
exports.CommentService = CommentService;
