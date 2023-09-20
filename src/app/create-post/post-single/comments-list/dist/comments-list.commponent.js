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
    function CommentsListComponent(authService, router, route, postService) {
        this.authService = authService;
        this.router = router;
        this.route = route;
        this.postService = postService;
        this.postComments = [];
    }
    // GET THE CREATOR OF POST
    CommentsListComponent.prototype.onGetUser = function (id) {
        var activeUserId = this.authService.getLocalStorageData()._id;
        if (id === activeUserId) {
            this.router.navigate(['/profile']);
        }
        else {
            this.router.navigate(["/view-profile/" + id]);
        }
    };
    CommentsListComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.Input()
    ], CommentsListComponent.prototype, "postComments");
    CommentsListComponent = __decorate([
        core_1.Component({
            selector: 'app-comments-list',
            templateUrl: './comments-list.commponent.html',
            styleUrls: ['../post-single.component.css']
        })
    ], CommentsListComponent);
    return CommentsListComponent;
}());
exports.CommentsListComponent = CommentsListComponent;
