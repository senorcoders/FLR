import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { ReservationDetailPage } from '../reservation-detail/reservation-detail';

@IonicPage()
@Component({
  selector: 'page-reservation-list',
  templateUrl: 'reservation-list.html',
})
export class ReservationListPage {

  azure_id:any;
  userID:any;
  userEndpoint:any = 'user/';
  reservations:any;
  data:any = {
      id: '',
      transaction_date: '',
      misc_trip_name: '',
      number_activity_reserved: '',
      transaction_start_date: '',
      transaction_end_date: '',
      transaction_start_time: '',
      transaction_end_time: '',
      price: ''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private httpProvider: UsersProvider) {
      this.getStatus();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationListPage');
  }

  getStatus(){
    this.httpProvider.hasLoggedIn().then(hasLoggedIn => {
      console.log(hasLoggedIn);
        if(hasLoggedIn){
          this.httpProvider.getAzureID().then(azure =>{
            this.azure_id = azure;
            console.log(azure);
            this.getUserID();
          });
        }
        
    });
  }


  getUserID(){
    this.httpProvider.getJsonData('user/azure_id/'+this.azure_id).subscribe(
      result =>{
        console.log(result);
          this.userID = result[0].id;
          this.getReservations();
      });
  }

  openMenu() {
    this.menuCtrl.open();
  }
 
  closeMenu() {
    this.menuCtrl.close();
  }
 
  toggleMenu() {
    this.menuCtrl.toggle();
  }

  getReservations(){
    this.httpProvider.getJsonData(this.userEndpoint + this.userID + '/reservations')
      .subscribe(result => {
        this.reservations = result;
      });
  }

  modifyReservation(id, transaction_date, misc_trip_name, number_activity_reserved, transaction_start_date, transaction_end_date, transaction_start_time, transaction_end_time, price){
    this.data.id = id;
    this.data.transaction_date = transaction_date;
    this.data.misc_trip_name = misc_trip_name;
    this.data.number_activity_reserved = number_activity_reserved;
    this.data.transaction_start_date = transaction_start_date;
    this.data.transaction_end_date = transaction_end_date;
    this.data.transaction_start_time = transaction_start_time;
    this.data.transaction_end_time = transaction_end_time;
    this.data.price = price;
    this.navCtrl.push(ReservationDetailPage, {reservation: this.data});
  }

}
