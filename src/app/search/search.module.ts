import { RouterModule } from '@angular/router';
import { PostListModule } from './../create-post/posts-list/post-list.module';
import { SharedModule } from './../shared/shared.module';
import { UsersSearchList } from './users-search-list/users-search-list.component';
import { SearchComponent } from './search.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearchComponent, UsersSearchList],
  imports: [
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: SearchComponent,
      },
    ]),
    PostListModule,
    SharedModule,
  ],
})
export class SearchModule {}
