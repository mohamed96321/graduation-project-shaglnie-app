export interface Comment {
  _id: string;
  creator: {
    _id: string;
    profileImage: string;
    userName: string;
  };
  commentText: string;
  commentImages: string[] | FileList;
  commentDate: string;
}
