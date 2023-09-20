"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SinglePostComponent = void 0;
var core_1 = require("@angular/core");
var SinglePostComponent = /** @class */ (function () {
    function SinglePostComponent(route, postService, socketIoService, commentService, langService) {
        this.route = route;
        this.postService = postService;
        this.socketIoService = socketIoService;
        this.commentService = commentService;
        this.langService = langService;
        this.language = '';
        this.postId = '';
        // DEFINE POST
        this.post = {
            _id: '',
            creator: {
                _id: '',
                profileImage: '',
                userName: ''
            },
            job: '',
            creatorPhone: '',
            creatorBigCity: '',
            creatorCity: '',
            postText: '',
            createByWorker: false,
            postDate: '',
            postImages: [''],
            comments: []
        };
        // DEFINE COMMENTS OF POST THEN PASS IT TO COMMENTS LIST COMPONENT
        this.postComments = [];
        // DEFINE IMAGES IF USER WANT TO ATTACH SOME IAMGES INTO HIS COMMENT
        this.commentImages = [];
    }
    SinglePostComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.language = this.langService.getCurrentLang();
        this.langService.getCurrentLanguage().subscribe(function (lang) {
            _this.language = lang;
        });
        this.socketIoService.init();
        this.route.params.subscribe(function (params) {
            // GET POST ID FORM URL : HTTP://LOCALHOST:4200/POST/:POSTID
            _this.postId = params['postId'];
            //=> LISTIN IF NEW COMMENT PUSHED
        });
        // THEN GET THAT POST BY ID
        this.postService.getPostById(this.postId).subscribe(function (resualt) {
            /**
             * EXTRACT CLASS PROPERTYIES FORM THE RESUALT
             * POST
             * POSTCOMMENTS
             */
            _this.post = resualt.post;
            _this.postComments = resualt.post.comments;
            _this.commentService.initComments(_this.postComments);
            _this.socketIoService.joinRoom('postid=' + _this.postId);
        });
    };
    SinglePostComponent.prototype.ngOnDestroy = function () {
        this.socketIoService.disconnectUser('postid=' + this.postId);
    };
    SinglePostComponent = __decorate([
        core_1.Component({
            selector: 'app-post-single',
            templateUrl: './post-single.component.html',
            styleUrls: ['./post-single.component.css']
        })
    ], SinglePostComponent);
    return SinglePostComponent;
}());
exports.SinglePostComponent = SinglePostComponent;
