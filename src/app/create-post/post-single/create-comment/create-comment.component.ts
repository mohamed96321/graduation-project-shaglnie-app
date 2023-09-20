import { CommentService } from './../comment.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/language.service';
@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css'],
})
export class CreateCommentComponent implements OnInit {
  language = '';
  isAuthenticated: boolean;
  commentImages: string[] = [];
  commentForm: FormGroup;
  @Input() postId: string = null;
  constructor(
    private authService: AuthService,
    private commentService: CommentService,
    private langService: LanguageService
  ) {}
  ngOnInit(): void {
    this.language = this.langService.getCurrentLang();
    this.langService.getCurrentLanguage().subscribe((lang) => {
      this.language = lang;
    });
    this.isAuthenticated = this.authService.getToken() ? true : false;
    this.commentForm = new FormGroup({
      commentText: new FormControl(null, [Validators.required]),
      commentImages: new FormControl(null),
    });
  }
  // ON ATTACH SOME IMAGES TO COMMENT REQUIEST
  onImagePicker(event: Event): void {
    // CATCH IMAGES TO VIEW IT TO USER
    this.commentImages = [];
    // GET IMAGES AS DATA < BITS OR BYTE>
    const files = (event.target as HTMLInputElement).files;
    // UPDATE COMMENTIMAGES OF THE FORM
    this.commentForm.patchValue({
      commentImages: files,
    });

    this.commentForm.get('commentImages').updateValueAndValidity();
    // LOOP IN FILES TO GET IMAGE URL DATA
    for (const index in files) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        // PUSH URLS INTO COMMENTIMAGES
        this.commentImages.push(fileReader.result as string);
      };
      // THEN READ DATA AS URL SOURCE
      fileReader.readAsDataURL(files[index]);
    }
  }
  // ON ADD COMMENT
  onAddComment() {
    // FORM IS VALID
    if (this.commentForm.valid) {
      console.log('new comment added');

      const { commentText, commentImages } = this.commentForm.value;
      this.commentService.addComment(this.postId, commentText, commentImages);
      this.commentImages = null;
      this.commentForm.reset();
    }
  }
}
