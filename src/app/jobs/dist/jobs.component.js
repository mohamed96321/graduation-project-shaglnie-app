"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JobsComponent = void 0;
var core_1 = require("@angular/core");
var JobsComponent = /** @class */ (function () {
    function JobsComponent(socketIOService, jobService) {
        this.socketIOService = socketIOService;
        this.jobService = jobService;
        this.postedJobs = [];
        this.errMsg = null;
        this.loading = false;
    }
    JobsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.socketIOService.joinRoom('allJobsRoom');
        this.jobService.getAllJobs();
        this.jobService.getUpdatedJobs().subscribe(function (posts) {
            if (posts) {
                _this.posts = posts;
                setTimeout(function () {
                    _this.loading = false;
                    _this.errMsg = null;
                }, 600);
            }
            else {
                _this.posts = null;
                _this.loading = false;
                _this.errMsg = 'لا يوجد اتصال بالانترنت';
            }
        });
        this.jobService.getUpdatedJobLinks().subscribe(function (links) {
            _this.postedJobs = links;
        });
        this.socketIOService.socket.on('onGetPost', function (post) {
            _this.jobService.addJob(post);
        });
        this.socketIOService.socket.on('onGetDeletedPostId', function (postId) {
            _this.jobService.deleteJob(postId);
        });
    };
    JobsComponent.prototype.ngOnDestroy = function () {
        this.socketIOService.disconnectUser('allJobsRoom');
    };
    JobsComponent = __decorate([
        core_1.Component({
            selector: 'app-jobs',
            templateUrl: './jobs.component.html',
            styleUrls: ['./jobs.component.css']
        })
    ], JobsComponent);
    return JobsComponent;
}());
exports.JobsComponent = JobsComponent;
