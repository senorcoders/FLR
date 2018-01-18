import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedPage } from '../feed/feed';


@IonicPage()
@Component({
  selector: 'page-modify-reservation',
  templateUrl: 'modify-reservation.html',
})
export class ModifyReservationPage {

  enableOverlay:boolean = true;
  bookingID:any;
  bookingDate:any;
  productName:any;
  qty:any;
  startDate:any;
  endDate:any;
  startHour:any;
  endHour:any;
  price:any;
  totalAmount:number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bookingID = navParams.get('reservation').id;
    this.bookingDate= navParams.get('reservation').transaction_date;
    this.productName = navParams.get('reservation').misc_trip_name;
    this.qty = navParams.get('reservation').number_activity_reserved;
    this.startDate = navParams.get('reservation').transaction_start_date;
    this.endDate = navParams.get('reservation').transaction_end_date;
    this.startHour = navParams.get('reservation').transaction_start_time;
    this.endHour = navParams.get('reservation').transaction_end_time;
    this.price = navParams.get('reservation').price;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyReservationPage');
  }

  viewReservation(){
    this.enableOverlay = false;
  }

  getAmount(){
    return this.price * this.qty;
  }

  goToFeed(){
    this.navCtrl.setRoot(FeedPage);
  }

}
