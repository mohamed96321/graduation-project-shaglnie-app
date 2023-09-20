"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommentsListComponent = void 0;
var core_1 = require("@angular/core");
var CommentsListComponent = /** @class */ (function () {
    function CommentsListComponent(authService, router, route, commentService, socketIoService, langService) {
        this.authService = authService;
        this.router = router;
        this.route = route;
        this.commentService = commentService;
        this.socketIoService = socketIoService;
        this.langService = langService;
        this.language = '';
        this.postComments = [];
        this.userId = '';
    }
    CommentsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.language = this.langService.getCurrentLang();
        this.langService.getCurrentLanguage().subscribe(function (lang) {
            _this.language = lang;
        });
        this.userId = this.authService.getLocalStorageData()['_id'];
        this.postComments = this.commentService.getComments();
        this.commentService.getUpdatedComments().subscribe(function (newComments) {
            _this.postComments = newComments;
        });
        // => listin if comment deleted
        this.socketIoService.socket.on('onGetDeletedComment', function (commentId) {
            // this.commentService.deleteCommentIo(commentId);
            var commentIndex = _this.postComments.findIndex(function (comment) { return comment._id === commentId; });
            _this.postComments.splice(commentIndex, 1);
            // this.updatedComments.next(this.comments);
        });
        this.socketIoService.socket.on('onGetComment', function (resualt) {
            _this.postComments.push(resualt.newComment);
        });
    }; // GET THE CREATOR OF POST
    CommentsListComponent.prototype.onDeleteComment = function (commentId) {
        var _this = this;
        this.route.params.subscribe(function (param) {
            _this.commentService.deleteComment(commentId, param['postId']);
        });
    };
    CommentsListComponent.prototype.onGetUser = function (id) {
        var activeUserId = this.authService.getLocalStorageData()._id;
        if (id === activeUserId) {
            this.router.navigate(['/profile']);
        }
        else {
            this.router.navigate(["/profile/" + id]);
        }
    };
    CommentsListComponent = __decorate([
        core_1.Component({
            selector: 'app-comments-list',
            templateUrl: './comments-list.commponent.html',
            styleUrls: ['./comments-list.component.css']
        })
    ], CommentsListComponent);
    return CommentsListComponent;
}());
exports.CommentsListComponent = CommentsListComponent;
