import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleReviewPage } from './single-review';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    SingleReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(SingleReviewPage),
    Ionic2RatingModule
  ],
})
export class SingleReviewPageModule {}
