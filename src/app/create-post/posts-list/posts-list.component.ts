import { LanguageService } from './../../language.service';
import { JobService } from './../../jobs/jobs.service';
import { SocketIoService } from './../../shared/socket-io.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  language = '';
  @Input() posts: Post[] = [];
  @Input() showPostControls: boolean = true;
  isAdmin = false;
  userId: string = null;
  deleltePost = false;
  displayedImageUrl: string = null;
  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private socketIoService: SocketIoService,
    private jobService: JobService,
    private langService: LanguageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.postService.init(this.posts);
  }
  ngOnInit(): void {
    //language
    this.language = this.langService.getCurrentLang();
    this.langService.getCurrentLanguage().subscribe((lang) => {
      this.language = lang;
    });
    this.deleltePost = false;
    this.isAdmin = this.authService.getIsAdmin() ? true : false;
    this.userId = this.authService.getLocalStorageData()._id;
  }
  // GET THE CREATOR OF POST
  onGetUser(id: string) {
    const activeUserId = this.authService.getLocalStorageData()._id;
    if (id === activeUserId) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate([`/profile/${id}`]);
    }
  }
  // DELETE POST
  onDeletePost(postId: string) {
    this.deleltePost = true;
    this.socketIoService.onDeletePost(postId);
    this.jobService.deleteJob(postId);
    this.postService.deletePost(postId);
    setTimeout(() => {
      this.deleltePost = false;
    }, 1200);
  }
  // ADD NEW COMMENT TO POST'S COMMENTS
  onAddComment(postId: string) {
    //=> JOINING SPECIFIC POST COMMENTS
    this.router.navigate(['/post/' + postId]);
  }
  // get image url
  displayImage(url: string): void {
    this.displayedImageUrl = url;
  }
  // close displayedImage
  closeImage() {
    this.displayedImageUrl = null;
  }
}
