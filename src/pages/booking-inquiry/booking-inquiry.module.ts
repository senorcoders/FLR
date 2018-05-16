import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingInquiryPage } from './booking-inquiry';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    BookingInquiryPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingInquiryPage),
    Ionic2RatingModule
  ],
})
export class BookingInquiryPageModule {}
