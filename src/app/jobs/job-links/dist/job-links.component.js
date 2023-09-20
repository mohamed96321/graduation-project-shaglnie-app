"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JobLinksComponent = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var JobLinksComponent = /** @class */ (function () {
    function JobLinksComponent(jobService, langService) {
        this.jobService = jobService;
        this.langService = langService;
        this.language = '';
        this.postedJobs = [];
    }
    JobLinksComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.language = this.langService.getCurrentLang();
        this.langService.getCurrentLanguage().subscribe(function (lang) {
            _this.language = lang;
        });
    };
    JobLinksComponent.prototype.getPosts = function (job, ele) {
        document.querySelectorAll('ul li').forEach(function (li) {
            li.classList.remove('active');
        });
        ele.classList.add('active');
        this.jobService.getPostByJob(job);
    };
    __decorate([
        core_1.Input()
    ], JobLinksComponent.prototype, "postedJobs");
    JobLinksComponent = __decorate([
        core_2.Component({
            selector: 'job-links',
            templateUrl: './job-links.component.html',
            styleUrls: ['./job-links.component.css']
        })
    ], JobLinksComponent);
    return JobLinksComponent;
}());
exports.JobLinksComponent = JobLinksComponent;
