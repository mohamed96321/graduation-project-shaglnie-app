import { LanguageService } from './../../../language.service';
import { SocketIoService } from './../../../shared/socket-io.service';
import { CommentService } from './../comment.service';
import { Comment } from '../create-comment/comment.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.commponent.html',
  styleUrls: ['./comments-list.component.css'],
})
export class CommentsListComponent implements OnInit {
  language = '';
  postComments: Comment[] = [];
  userId: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private socketIoService: SocketIoService,
    private langService: LanguageService
  ) {}
  ngOnInit(): void {
    this.language = this.langService.getCurrentLang();
    this.langService.getCurrentLanguage().subscribe((lang) => {
      this.language = lang;
    });
    this.userId = this.authService.getLocalStorageData()['_id'];
    this.postComments = this.commentService.getComments();
    this.commentService.getUpdatedComments().subscribe((newComments) => {
      this.postComments = newComments;
    });
    // => listin if comment deleted
    this.socketIoService.socket.on(
      'onGetDeletedComment',
      (commentId: string) => {
        // this.commentService.deleteCommentIo(commentId);
        const commentIndex = this.postComments.findIndex(
          (comment) => comment._id === commentId
        );
        this.postComments.splice(commentIndex, 1);
        // this.updatedComments.next(this.comments);
      }
    );
    this.socketIoService.socket.on(
      'onGetComment',
      (resualt: { newComment: Comment; joinPath: string }) => {
        this.postComments.push(resualt.newComment);
      }
    );
  } // GET THE CREATOR OF POST
  onDeleteComment(commentId: string) {
    this.route.params.subscribe((param: Params) => {
      this.commentService.deleteComment(commentId, param['postId']);
    });
  }
  onGetUser(id: string) {
    const activeUserId = this.authService.getLocalStorageData()._id;
    if (id === activeUserId) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate([`/profile/${id}`]);
    }
  }
}
