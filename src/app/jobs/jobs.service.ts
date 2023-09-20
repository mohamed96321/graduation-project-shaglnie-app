import { HttpClient } from '@angular/common/http';
import { PostService } from './../create-post/post.service';
import { Subject, Observable } from 'rxjs';
import { Post } from './../create-post/post.model';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class JobService {
  private readonly url = 'http://localhost:3000/api/post/';
  private jobs: Post[] = [];
  private updatedJobs = new Subject<Post[]>();
  private jobLinks: string[] = [];
  private updateJobLinks = new Subject<string[]>();
  constructor(private postService: PostService, private http: HttpClient) {}
  getJobLinks(jobs: Post[]) {
    this.jobLinks = [];
    jobs.forEach((job) => {
      if (!this.jobLinks.includes(job.job)) {
        this.jobLinks.push(job.job);
      }
    });
    this.updateJobLinks.next(this.jobLinks);
  }
  addJob(job: Post) {
    this.jobs.push(job);
    this.getJobLinks(this.jobs);
    this.updatedJobs.next(this.jobs);
  }
  deleteJob(jobId: string) {
    const jobIndex = this.jobs.findIndex((job) => job._id === jobId);
    this.jobs.splice(jobIndex, 1);
    this.getJobLinks(this.jobs);
    this.updatedJobs.next(this.jobs);
  }
  // GET ALL USERS POSTS #################3
  getAllJobs() {
    this.http.get<{ message: string; posts: Post[] }>(this.url).subscribe(
      (resualt: { message: string; posts: Post[] }) => {
        this.jobs = resualt.posts;
        this.getJobLinks(this.jobs);
        this.updatedJobs.next(this.jobs);
      },
      (err) => {
        this.jobs = null;
        this.updatedJobs.next(this.jobs);
      }
    );
  }
  // FILTER POSTS BY POST JOB
  getPostByJob(job: string) {
    let selectedPosts: Post[] = [];
    selectedPosts =
      job == '*' ? this.jobs : this.jobs.filter((post) => post.job === job);
    this.updatedJobs.next(selectedPosts);
  }
  getUpdatedJobs(): Observable<Post[]> {
    return this.updatedJobs.asObservable();
  }
  getUpdatedJobLinks(): Observable<string[]> {
    return this.updateJobLinks.asObservable();
  }
}
