"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeModule = void 0;
var router_1 = require("@angular/router");
var home_component_1 = require("./home.component");
var footer_component_1 = require("./footer/footer.component");
var sponsor_component_1 = require("./sponsor/sponsor.component");
var blogs_component_1 = require("./blogs/blogs.component");
var services_component_1 = require("./services/services.component");
var features_component_1 = require("./features/features.component");
var banner_component_1 = require("./banner/banner.component");
var testimonial_module_1 = require("./testimonial/testimonial.module");
var core_1 = require("@angular/core");
var subscribe_component_1 = require("./subscribe/subscribe.component");
var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            declarations: [
                home_component_1.HomeComponent,
                banner_component_1.BannerComponent,
                features_component_1.FeaturesComponent,
                services_component_1.ServicesComponent,
                blogs_component_1.BlogsComponent,
                subscribe_component_1.SubscribeComponent,
                sponsor_component_1.SponsorComponent,
                footer_component_1.FooterComponent,
            ],
            imports: [
                router_1.RouterModule.forChild([{
                        path: '',
                        component: home_component_1.HomeComponent
                    }]),
                testimonial_module_1.TestimonialModule,
            ]
        })
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
