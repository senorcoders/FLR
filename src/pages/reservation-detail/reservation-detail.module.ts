import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationDetailPage } from './reservation-detail';
import { Ionic2RatingModule } from 'ionic2-rating';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    ReservationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationDetailPage),
    Ionic2RatingModule,
    MomentModule
  ],
})
export class ReservationDetailPageModule {}
