import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertSuccessComponent } from './alert-success/alert-success.component';
import { AlertDangerComponent } from './alert-danger/alert-danger.component';
import { LoadingComponent } from './loading/loading.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [LoadingComponent, AlertDangerComponent, AlertSuccessComponent],
  imports: [CommonModule,RouterModule],
  exports: [
    CommonModule,
    LoadingComponent,
    AlertDangerComponent,
    AlertSuccessComponent,
  ],
})
export class SharedModule {}
