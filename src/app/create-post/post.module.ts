import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'timeline',
        loadChildren: () =>
          import('../jobs/jobs.module').then((m) => m.JobsModule),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('../search/search.module').then((m) => m.SearchModule),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./create-post.module').then((m) => m.CreatePostModule),
      },
      {
        path: ':postId',
        loadChildren: () =>
          import('./post-single/post-single.module').then(
            (m) => m.PostSingleModule
          ),
      },
    ]),
  ],
})
export class PostModule {}
