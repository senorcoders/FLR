import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FeedPage } from '../feed/feed';
import { MapPage } from '../map/map';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
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
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
}

  viewReservation(){
    this.enableOverlay = false;
  }

  getAmount(){
    return this.price * this.qty;
  }

  goToFeed(){
    this.navCtrl.popToRoot();
  }
  setFeed(){
    this.navCtrl.setRoot(FeedPage);
  }

  goToMap(){
    this.navCtrl.push(MapPage);
  }

  tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time[0] + time[1] + time[2] + time[5]; // return adjusted time or original string
  }

}
