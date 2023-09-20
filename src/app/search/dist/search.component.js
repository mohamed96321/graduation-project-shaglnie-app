"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SearchComponent = void 0;
var core_1 = require("@angular/core");
// DECARATOR
/**
 * <DIV>KEKKEKKE</DIV>
 */
var SearchComponent = /** @class */ (function () {
    function SearchComponent(autService, searchService, langService) {
        this.autService = autService;
        this.searchService = searchService;
        this.langService = langService;
        this.language = '';
        this.searched = false;
        this.selectedPosts = [];
        this.savedSelectedPost = [];
        this.userData = {
            job: '',
            userBigCity: '',
            userCity: ''
        };
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        // language
        this.language = this.langService.getCurrentLang();
        this.langService.getCurrentLanguage().subscribe(function (lang) {
            _this.language = lang;
        });
        if (this.autService.getToken) {
            var _a = this.autService.getLocalStorageData(), job = _a.job, userBigCity = _a.userBigCity, userCity = _a.userCity;
            this.userData = {
                job: job,
                userBigCity: userBigCity,
                userCity: userCity
            };
        }
        this.selectedPosts = this.savedSelectedPost;
    };
    SearchComponent.prototype.ngOnDestroy = function () {
        this.savedSelectedPost = this.selectedPosts;
    };
    SearchComponent.prototype.onSubmit = function (f) {
        var _this = this;
        var _a = f.value, job = _a.job, bigCity = _a.bigCity, city = _a.city, isWorker = _a.isWorker;
        this.searchService
            .search(job, bigCity, city, isWorker)
            .subscribe(function (resualt) {
            _this.searched = true;
            _this.selectedPosts = resualt.posts;
            _this.selectedUsers = resualt.users;
        });
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'app-search',
            templateUrl: './search.component.html',
            styleUrls: ['./search.component.css']
        })
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
