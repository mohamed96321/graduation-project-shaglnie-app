"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LanguageService = void 0;
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var LanguageService = /** @class */ (function () {
    function LanguageService() {
        this.currentLanguage = 'arb';
        this.lang = new rxjs_1.Subject();
    }
    LanguageService.prototype.changeLang = function () {
        this.currentLanguage =
            localStorage.getItem('lang') === 'arb' ? 'eng' : 'arb';
        localStorage.setItem('lang', this.currentLanguage);
        this.lang.next(this.currentLanguage);
    };
    LanguageService.prototype.initialLanguage = function () {
        this.currentLanguage = !localStorage.getItem('lang')
            ? 'arb'
            : localStorage.getItem('lang');
        localStorage.setItem('lang', this.currentLanguage);
        this.lang.next(this.currentLanguage);
    };
    LanguageService.prototype.getCurrentLanguage = function () {
        return this.lang.asObservable();
    };
    LanguageService.prototype.getCurrentLang = function () {
        return localStorage.getItem('lang');
    };
    LanguageService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LanguageService);
    return LanguageService;
}());
exports.LanguageService = LanguageService;
