"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TestimonialService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var TestimonialService = /** @class */ (function () {
    function TestimonialService(http) {
        this.http = http;
        this.url = 'http://localhost:3000/api/review/';
        this._testtimonials = [];
        this.testimonials = new rxjs_1.Subject();
    }
    TestimonialService.prototype.getReview = function (belongTo) {
        var _this = this;
        this.http
            .get(this.url + 'getReviews/' + belongTo)
            .subscribe(function (resualt) {
            _this._testtimonials = resualt.reviews;
            _this.testimonials.next(_this._testtimonials);
        });
    };
    TestimonialService.prototype.addTestimonial = function (_id, profileImage, userName, reviewText, belongTo) {
        var _this = this;
        this.http
            .post(this.url + 'addReview', {
            reviewText: reviewText,
            belongTo: belongTo
        })
            .subscribe(function (res) {
            if (res) {
                console.log(res);
                var testi = {
                    creator: {
                        _id: _id,
                        profileImage: profileImage,
                        userName: userName
                    },
                    reviewText: reviewText
                };
                _this._testtimonials.push(testi);
                _this.testimonials.next(_this._testtimonials);
            }
        });
    };
    TestimonialService.prototype.getUpdatedTestimonials = function () {
        return this.testimonials.asObservable();
    };
    TestimonialService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], TestimonialService);
    return TestimonialService;
}());
exports.TestimonialService = TestimonialService;
