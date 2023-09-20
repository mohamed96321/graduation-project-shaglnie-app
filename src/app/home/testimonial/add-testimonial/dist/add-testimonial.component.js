"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddTestimonialComponent = void 0;
var core_1 = require("@angular/core");
var AddTestimonialComponent = /** @class */ (function () {
    function AddTestimonialComponent(authService, testimonialService, route, langService) {
        this.authService = authService;
        this.testimonialService = testimonialService;
        this.route = route;
        this.langService = langService;
        this.language = '';
        this.errMsg = null;
        this.successMsg = null;
        this.belongTo = null;
        this.isAdmin = false;
    }
    AddTestimonialComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.language = this.langService.getCurrentLang();
        this.langService.getCurrentLanguage().subscribe(function (lang) {
            _this.language = lang;
        });
        this.isAdmin = this.authService.getIsAdmin() ? true : false;
    };
    AddTestimonialComponent.prototype.onAddTestimonial = function (f) {
        var _this = this;
        if (f.valid) {
            var _a = this.authService.getLocalStorageData(), _id = _a._id, profileImage = _a.profileImage, userName = _a.userName;
            if (_id) {
                this.route.params.subscribe(function (params) {
                    _this.belongTo = params['id'] ? params['id'] : 'site';
                });
                var belongTo = this.belongTo;
                this.testimonialService.addTestimonial(_id, profileImage, userName, f.value.userOpnion, belongTo);
                this.successMsg = 'شكرا لمشاركتك برأيك';
                setTimeout(function () {
                    _this.successMsg = null;
                }, 1000);
                this.errMsg = null;
            }
            else {
                this.errMsg = 'برجاء تسجيل الدخول اولا';
                setTimeout(function () {
                    _this.errMsg = null;
                }, 3000);
                this.successMsg = null;
            }
        }
    };
    AddTestimonialComponent = __decorate([
        core_1.Component({
            selector: 'app-add-testimonial',
            templateUrl: './add-testimonial.component.html',
            styleUrls: ['./add-testimonial.component.css']
        })
    ], AddTestimonialComponent);
    return AddTestimonialComponent;
}());
exports.AddTestimonialComponent = AddTestimonialComponent;
