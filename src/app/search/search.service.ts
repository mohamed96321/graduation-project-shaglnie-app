import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../create-post/post.model';
@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient) {}
  search(job: string, bigCity: string, city: string, isWorker: string) {
    return this.http.get<{
      message: string;
      posts: Post[];
      users?: {
        _id: string;
        userName: string;
        profileImage: string;
        userPhone: string;
      }[];
    }>(
      `http://localhost:3000/api/search/${job}/${bigCity}/${city}/${isWorker}`
    );
  }
}
