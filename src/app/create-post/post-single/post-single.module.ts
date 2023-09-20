import { RouterModule } from '@angular/router';
import { SinglePostComponent } from './post-single.component';
import { CommentModule } from './comment.module';
import { PostListModule } from '../posts-list/post-list.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [SinglePostComponent],
  imports: [
    CommentModule,
    RouterModule.forChild([
      {
        path: '',
        component: SinglePostComponent,
      },
    ]),
    PostListModule,
    CommentModule,
  ],
})
export class PostSingleModule {}
