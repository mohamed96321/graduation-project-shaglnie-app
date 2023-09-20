"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReportService = void 0;
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var ReportService = /** @class */ (function () {
    function ReportService(http) {
        this.http = http;
        this.url = 'http://localhost:3000/api/report';
        this.reports = [];
        this.updatedReports = new rxjs_1.Subject();
    }
    ReportService.prototype.getAllReports = function () {
        var _this = this;
        this.http.get(this.url).subscribe(function (resualt) {
            _this.reports = resualt.reports;
            _this.updatedReports.next(_this.reports);
        });
    };
    ReportService.prototype.deleteReport = function (id) {
        var index = this.reports.findIndex(function (r) { return r._id == id; });
        this.http["delete"](this.url + '/' + id).subscribe(function (resualt) {
            console.log(resualt);
        });
        this.reports.splice(index, 1);
        this.updatedReports.next(this.reports);
    };
    ReportService.prototype.getReports = function () {
        return this.reports;
    };
    ReportService.prototype.getUpdatedReports = function () {
        return this.updatedReports.asObservable();
    };
    ReportService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ReportService);
    return ReportService;
}());
exports.ReportService = ReportService;
