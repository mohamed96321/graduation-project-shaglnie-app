"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TestimonialModule = void 0;
var testimonial_component_1 = require("./testimonial.component");
var testimonial_list_component_1 = require("./testimonial-list/testimonial-list.component");
var add_testimonial_component_1 = require("./add-testimonial/add-testimonial.component");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var TestimonialModule = /** @class */ (function () {
    function TestimonialModule() {
    }
    TestimonialModule = __decorate([
        core_1.NgModule({
            declarations: [
                add_testimonial_component_1.AddTestimonialComponent,
                testimonial_list_component_1.TestimonialListComponent,
                testimonial_component_1.TestimonialComponent,
            ],
            imports: [common_1.CommonModule, forms_1.FormsModule],
            exports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                add_testimonial_component_1.AddTestimonialComponent,
                testimonial_list_component_1.TestimonialListComponent,
                testimonial_component_1.TestimonialComponent,
            ]
        })
    ], TestimonialModule);
    return TestimonialModule;
}());
exports.TestimonialModule = TestimonialModule;
