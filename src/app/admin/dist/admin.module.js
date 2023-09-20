"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddminModule = void 0;
var forms_1 = require("@angular/forms");
var statistic_component_1 = require("./statistic/statistic.component");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var shared_module_1 = require("./../shared/shared.module");
var core_1 = require("@angular/core");
var report_component_1 = require("./report/report.component");
var user_component_1 = require("./user/user.component");
var AddminModule = /** @class */ (function () {
    function AddminModule() {
    }
    AddminModule = __decorate([
        core_1.NgModule({
            declarations: [statistic_component_1.StatisticComponent, report_component_1.ReportComponent, user_component_1.UserComponent],
            imports: [
                common_1.CommonModule,
                shared_module_1.SharedModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild([
                    {
                        path: 'statistic',
                        component: statistic_component_1.StatisticComponent
                    },
                    {
                        path: 'reports',
                        component: report_component_1.ReportComponent
                    },
                    {
                        path: 'users',
                        component: user_component_1.UserComponent
                    },
                ]),
            ]
        })
    ], AddminModule);
    return AddminModule;
}());
exports.AddminModule = AddminModule;
