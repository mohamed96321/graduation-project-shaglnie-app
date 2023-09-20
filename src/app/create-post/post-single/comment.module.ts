import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CommentsListComponent, CreateCommentComponent],
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  exports: [CommentsListComponent, CreateCommentComponent, CommonModule],
})
export class CommentModule {}
