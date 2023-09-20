import { SharedModule } from './../../shared/shared.module';
import { PostsListComponent } from './posts-list.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [PostsListComponent],
  imports: [SharedModule],
  exports: [PostsListComponent, SharedModule],
})
export class PostListModule {}
