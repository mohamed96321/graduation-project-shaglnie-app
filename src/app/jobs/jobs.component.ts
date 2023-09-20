import { JobService } from './jobs.service';
import { Post } from './../create-post/post.model';
import { SocketIoService } from './../shared/socket-io.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  posts: Post[];
  postedJobs: string[] = [];
  errMsg: string = null;
  loading = false;

  constructor(
    private socketIOService: SocketIoService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.socketIOService.joinRoom('allJobsRoom');
    this.jobService.getAllJobs();
    this.jobService.getUpdatedJobs().subscribe((posts) => {
      if (posts) {
        this.posts = posts;
        setTimeout(() => {
          this.loading = false;
          this.errMsg = null;
        }, 600);
      } else {
        this.posts = null;
        this.loading = false;
        this.errMsg = 'لا يوجد اتصال بالانترنت';
      }
    });
    this.jobService.getUpdatedJobLinks().subscribe((links) => {
      this.postedJobs = links;
    });
    this.socketIOService.socket.on('onGetPost', (post: Post) => {
      this.jobService.addJob(post);
    });
    this.socketIOService.socket.on('onGetDeletedPostId', (postId: string) => {
      this.jobService.deleteJob(postId);
    });
  }
  ngOnDestroy(): void {
    this.socketIOService.disconnectUser('allJobsRoom');
  }
}
