import { SocketIoService } from './../../shared/socket-io.service';
import { AuthService } from './../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Comment } from './create-comment/comment.model';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class CommentService {
  private comments: Comment[] = [];
  private updatedComments = new Subject<Comment[]>();
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private socketIoService: SocketIoService
  ) {}
  initComments(initialComments: Comment[]) {
    this.comments = initialComments;
    this.updatedComments.next(this.comments);
  }
  addComment(postId: string, commentText: string, commentImages: FileList) {
    const formData = new FormData();
    formData.append('commentText', commentText);
    if (commentImages) {
      for (const index in commentImages) {
        formData.append('commentImages', commentImages[index]);
      }
    }
    this.http
      .post('http://localhost:3000/api/comment/addComment/' + postId, formData)
      .subscribe((resualt: { message: string; newComment: Comment }) => {
        const {
          _id,
          userName,
          profileImage,
        } = this.authService.getLocalStorageData();
        const newComment = {
          ...resualt.newComment,
          creator: { _id, userName, profileImage },
        };
        this.comments.push(newComment);
        this.updatedComments.next(this.comments);
        this.socketIoService.onAddComment(newComment, 'postid=' + postId);
      });
  }
  deleteComment(commentId: string, postId?: string): void {
    this.deleteCommentIo(commentId);
    this.http
      .delete('http://localhost:3000/api/comment/' + commentId)
      .subscribe((message) => {});
    this.socketIoService.onDeleteComment(commentId, 'postid=' + postId);
  }
  deleteCommentIo(commentId: string) {
    const commentIndex = this.comments.findIndex(
      (comment) => comment._id === commentId
    );
    this.comments.splice(commentIndex, 1);
    this.updatedComments.next(this.comments);
  }
  addCommentIo(comment: Comment): void {
    this.comments.push(comment);
    this.updatedComments.next(this.comments);
  }
  // get comments
  getComments(): Comment[] {
    return this.comments;
  }
  //LISTEN TO updatedComments OF ANY USER ADD NEW COMMENT
  getUpdatedComments(): Observable<Comment[]> {
    return this.updatedComments.asObservable();
  }
}
