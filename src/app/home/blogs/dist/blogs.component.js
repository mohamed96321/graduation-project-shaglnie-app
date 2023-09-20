"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BlogsComponent = void 0;
var core_1 = require("@angular/core");
var BlogsComponent = /** @class */ (function () {
    function BlogsComponent(langService) {
        this.langService = langService;
        this.language = '';
    }
    BlogsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.language = this.langService.getCurrentLang();
        this.langService.getCurrentLanguage().subscribe(function (lang) {
            _this.language = lang;
        });
    };
    BlogsComponent = __decorate([
        core_1.Component({
            selector: 'app-blogs',
            templateUrl: './blogs.component.html',
            styleUrls: ['../shared-style.css', './blogs.component.css']
        })
    ], BlogsComponent);
    return BlogsComponent;
}());
exports.BlogsComponent = BlogsComponent;
