import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { FooterComponent } from './footer/footer.component';
import { SponsorComponent } from './sponsor/sponsor.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ServicesComponent } from './services/services.component';
import { FeaturesComponent } from './features/features.component';
import { BannerComponent } from './banner/banner.component';
import { TestimonialModule } from './testimonial/testimonial.module';
import { NgModule } from '@angular/core';
import { SubscribeComponent } from './subscribe/subscribe.component';
@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    FeaturesComponent,
    ServicesComponent,
    BlogsComponent,
    SubscribeComponent,
    SponsorComponent,
    FooterComponent,
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      component: HomeComponent,
    }]),
    TestimonialModule,
  ],
})
export class HomeModule {}
