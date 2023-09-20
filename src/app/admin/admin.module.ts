import { FormsModule } from '@angular/forms';
import { StatisticComponent } from './statistic/statistic.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { ReportComponent } from './report/report.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [StatisticComponent, ReportComponent, UserComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'statistic',
        component: StatisticComponent,
      },
      {
        path: 'reports',
        component: ReportComponent,
      },
      {
        path: 'users',
        component: UserComponent,
      },
    ]),
  ],
})
export class AddminModule {}
