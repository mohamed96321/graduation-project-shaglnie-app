import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
export interface Testimonial {
  creator: {
    _id: string;
    profileImage: string;
    userName: string;
  };
  reviewText: string;
}
@Injectable({ providedIn: 'root' })
export class TestimonialService {
  private url = 'http://localhost:3000/api/review/';
  private _testtimonials: Testimonial[] = [];
  testimonials = new Subject<Testimonial[]>();
  constructor(private http: HttpClient) {}
  getReview(belongTo: string) {
    this.http
      .get(this.url + 'getReviews/' + belongTo)
      .subscribe((resualt: { message: string; reviews: Testimonial[] }) => {
        this._testtimonials = resualt.reviews;
        this.testimonials.next(this._testtimonials);
      });
  }
  addTestimonial(
    _id: string,
    profileImage: string,
    userName: string,
    reviewText: string,
    belongTo: string
  ) {
    this.http
      .post(this.url + 'addReview', {
        reviewText,
        belongTo,
      })
      .subscribe((res) => {
        if (res) {
          console.log(res);
          const testi: Testimonial = {
            creator: {
              _id,
              profileImage,
              userName,
            },
            reviewText,
          };
          this._testtimonials.push(testi);
          this.testimonials.next(this._testtimonials);
        }
      });
  }
  getUpdatedTestimonials(): Observable<Testimonial[]> {
    return this.testimonials.asObservable();
  }
}
