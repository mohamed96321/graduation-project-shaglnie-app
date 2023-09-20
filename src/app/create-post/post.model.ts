import { Comment } from './post-single/create-comment/comment.model';
export interface Post {
  _id: string;
  creator: {
    _id: string;
    profileImage: string;
    userName: string;
  };
  job: string;
  creatorPhone: string;
  creatorBigCity: string;
  creatorCity: string;
  postText: string;
  createByWorker: boolean;
  postDate: string;
  postImages: string[] | FileList;
  comments: Comment[];
}
