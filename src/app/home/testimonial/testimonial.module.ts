import { TestimonialComponent } from './testimonial.component';
import { TestimonialListComponent } from './testimonial-list/testimonial-list.component';
import { AddTestimonialComponent } from './add-testimonial/add-testimonial.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddTestimonialComponent,
    TestimonialListComponent,
    TestimonialComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    CommonModule,
    FormsModule,
    AddTestimonialComponent,
    TestimonialListComponent,
    TestimonialComponent,
  ],
})
export class TestimonialModule {}
