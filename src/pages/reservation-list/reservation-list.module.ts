import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationListPage } from './reservation-list';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    ReservationListPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationListPage),
    MomentModule
  ],
})
export class ReservationListPageModule {}
