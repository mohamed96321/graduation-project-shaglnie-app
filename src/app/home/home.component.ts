import { Component, OnInit } from '@angular/core';
import {
  Testimonial,
  TestimonialService,
} from './testimonial/testimonial.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  testimonials: Testimonial[] = [];
  constructor(private testimonialService: TestimonialService) {}
  ngOnInit(): void {
    this.testimonialService.getReview('site');
    this.testimonialService.getUpdatedTestimonials().subscribe((res) => {
      this.testimonials = res;
    });
  }
}
