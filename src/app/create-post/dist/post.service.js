"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostService = void 0;
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var PostService = /** @class */ (function () {
    function PostService(http) {
        this.http = http;
        this.userPosts = [];
        this.updatedUserPosts = new rxjs_1.Subject();
        // BASIC URL TO POST ROUTES AT SERVER
        this.url = 'http://localhost:3000/api/post/';
    }
    // => INIT USER POSTS
    PostService.prototype.init = function (posts) {
        this.userPosts = posts;
        this.updatedUserPosts.next(this.userPosts);
    };
    // ADDING POSTS FUCTION ################
    PostService.prototype.addPost = function (job, creatorPhone, creatorBigCity, creatorCity, postText, postImages, createByWorker) {
        var formData = new FormData();
        var date = new Date().toLocaleDateString();
        formData.append('job', job);
        formData.append('creatorPhone', creatorPhone);
        formData.append('creatorBigCity', creatorBigCity);
        formData.append('creatorCity', creatorCity);
        if (postImages) {
            for (var img in postImages) {
                formData.append('postImages', postImages[img]);
            }
        }
        formData.append('postText', postText);
        formData.append('createByWorker', createByWorker);
        formData.append('postDate', date);
        return this.http.post(this.url + 'addPost', formData);
    };
    // DELETE POST BY ID ################
    PostService.prototype.deletePost = function (postId) {
        console.log(this.userPosts);
        var postIndex = this.userPosts.findIndex(function (post) { return post._id === postId; });
        this.userPosts.splice(postIndex, 1);
        console.log(this.userPosts);
        this.updatedUserPosts.next(this.userPosts);
        this.http["delete"](this.url + postId)
            .subscribe(function (resualt) {
            console.log(resualt);
        });
    };
    // GET POST BY ID FUNCTION
    PostService.prototype.getPostById = function (postId) {
        return this.http.get(this.url + postId);
    };
    // GET COMMENT OF SPECIFIC POST
    PostService.prototype.getPostComment = function (postId) {
        return this.http.get('http://localhost:3000/api/comment/' + postId);
    };
    // GET UPDATE USER POSTS
    PostService.prototype.getUpdatedPosts = function () {
        return this.updatedUserPosts.asObservable();
    };
    PostService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], PostService);
    return PostService;
}());
exports.PostService = PostService;
