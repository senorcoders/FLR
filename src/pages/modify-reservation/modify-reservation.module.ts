import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyReservationPage } from './modify-reservation';
import { Ionic2RatingModule } from 'ionic2-rating';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    ModifyReservationPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyReservationPage),
    Ionic2RatingModule,
    MomentModule
  ],
})
export class ModifyReservationPageModule {}
