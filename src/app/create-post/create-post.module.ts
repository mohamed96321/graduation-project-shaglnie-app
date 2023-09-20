import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { CreatePostComponent } from './create-post.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [CreatePostComponent],
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CreatePostComponent,
      },
    ]),
    SharedModule,
  ],
})
export class CreatePostModule {}
