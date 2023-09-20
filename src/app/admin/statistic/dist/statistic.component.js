"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StatisticComponent = void 0;
var core_1 = require("@angular/core");
var StatisticComponent = /** @class */ (function () {
    function StatisticComponent(statisticService, langService) {
        this.statisticService = statisticService;
        this.langService = langService;
        this.language = '';
        this.counts = {
            postCount: 0,
            userCount: 0,
            commentCount: 0,
            reportCount: 0
        };
    }
    StatisticComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.language = this.langService.getCurrentLang();
        this.langService.getCurrentLanguage().subscribe(function (lang) {
            _this.language = lang;
        });
        this.statisticService.getNumbers().subscribe(function (resualt) {
            _this.counts = resualt;
            console.log(resualt);
        });
    };
    StatisticComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-statistics',
            templateUrl: './statistic.component.html',
            styleUrls: ['./statistic.component.css']
        })
    ], StatisticComponent);
    return StatisticComponent;
}());
exports.StatisticComponent = StatisticComponent;
