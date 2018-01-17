import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { SingleReviewPage } from '../single-review/single-review';


@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {

  endpoint:any = 'reservation/reviews/all';
  reviews:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private httpProvider: UsersProvider) {
      this.getReviews();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
  }

  getReviews(){
    this.httpProvider.getJsonData(this.endpoint).subscribe(result => {
      this.reviews = result;
    });
  }

  evaluate(product){
    this.navCtrl.push(SingleReviewPage, {'product': product});
  }

}
