"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostsListComponent = void 0;
var core_1 = require("@angular/core");
var PostsListComponent = /** @class */ (function () {
    function PostsListComponent(postService, authService, router, socketIoService, jobService, langService) {
        this.postService = postService;
        this.authService = authService;
        this.router = router;
        this.socketIoService = socketIoService;
        this.jobService = jobService;
        this.langService = langService;
        this.language = '';
        this.posts = [];
        this.showPostControls = true;
        this.isAdmin = false;
        this.userId = null;
        this.deleltePost = false;
        this.displayedImageUrl = null;
    }
    PostsListComponent.prototype.ngOnChanges = function (changes) {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        this.postService.init(this.posts);
    };
    PostsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        //language
        this.language = this.langService.getCurrentLang();
        this.langService.getCurrentLanguage().subscribe(function (lang) {
            _this.language = lang;
        });
        this.deleltePost = false;
        this.isAdmin = this.authService.getIsAdmin() ? true : false;
        this.userId = this.authService.getLocalStorageData()._id;
    };
    // GET THE CREATOR OF POST
    PostsListComponent.prototype.onGetUser = function (id) {
        var activeUserId = this.authService.getLocalStorageData()._id;
        if (id === activeUserId) {
            this.router.navigate(['/profile']);
        }
        else {
            this.router.navigate(["/profile/" + id]);
        }
    };
    // DELETE POST
    PostsListComponent.prototype.onDeletePost = function (postId) {
        var _this = this;
        this.deleltePost = true;
        this.socketIoService.onDeletePost(postId);
        this.jobService.deleteJob(postId);
        this.postService.deletePost(postId);
        setTimeout(function () {
            _this.deleltePost = false;
        }, 1200);
    };
    // ADD NEW COMMENT TO POST'S COMMENTS
    PostsListComponent.prototype.onAddComment = function (postId) {
        //=> JOINING SPECIFIC POST COMMENTS
        this.router.navigate(['/post/' + postId]);
    };
    // get image url
    PostsListComponent.prototype.displayImage = function (url) {
        this.displayedImageUrl = url;
    };
    // close displayedImage
    PostsListComponent.prototype.closeImage = function () {
        this.displayedImageUrl = null;
    };
    __decorate([
        core_1.Input()
    ], PostsListComponent.prototype, "posts");
    __decorate([
        core_1.Input()
    ], PostsListComponent.prototype, "showPostControls");
    PostsListComponent = __decorate([
        core_1.Component({
            selector: 'app-posts-list',
            templateUrl: './posts-list.component.html',
            styleUrls: ['./posts-list.component.css']
        })
    ], PostsListComponent);
    return PostsListComponent;
}());
exports.PostsListComponent = PostsListComponent;
