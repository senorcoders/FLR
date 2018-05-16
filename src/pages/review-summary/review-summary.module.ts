import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewSummaryPage } from './review-summary';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ProgressBarModule } from 'angular-progress-bar';

@NgModule({
  declarations: [
    ReviewSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewSummaryPage),
    Ionic2RatingModule,
    ProgressBarModule
  ],
})
export class ReviewSummaryPageModule {}
