import { Testimonial } from './../testimonial.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonial-list',
  templateUrl: './testimonial-list.component.html',
  styleUrls: ['./testimonial-list.component.css'],
})
export class TestimonialListComponent implements OnInit {
  @Input() testimonials: Testimonial[] = [];
  constructor() {}

  ngOnInit(): void {}
}
