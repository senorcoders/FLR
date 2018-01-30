import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { ModifyReservationPage } from '../modify-reservation/modify-reservation';
import { Device } from '@ionic-native/device';


@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  azure_id:any;
  user_id:any;
  endpoint:any = 'user/azure_id/';
  hasLoggedIn:boolean;
  productID:any;
  productName:any;
  price:any;
  transaction_start_date:any;
  transaction_end_date:any;
  transaction_start_time:any;
  transaction_end_time:any;
  number_activity_reserved:any;
  reservationEndpoint:any = 'reservation';
  guestName:any;
  guestEmail:any;
  guestMobile:any;
  guestId:any;
  guestEndpoint:any = 'guest';
  deviceID:any;
  token:any;
  name:any;
  merchid:any = '496160873888';
  amount:any;
  currency:any = 'USD';
  address:any;
  city:any;
  region:any;
  country:any;
  postal:any;
  ecomind:any = 'E';
  cvv2:any;
  tokenize:any = 'Y';
  capture:any = 'Y';
  acctype:any = 'VISA';
  orderid:any = 'AB-11-9876"';
  account:any;
  cardConnectEnpoint:any = 'https://fts.cardconnect.com:6443/cardconnect/rest/auth';
  expiry:any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private httpProvider: UsersProvider,
    public alertCtrl: AlertController,
    private device: Device) {
      var that = this;

      // window.addEventListener('message', function(event) {
      //   // document.getElementById('mytoken').value = JSON.parse(event.data);
      //   that.token;
        
      //   var token = JSON.parse(event.data);      
        
      //   console.log('Received message ' + token.message);
      //   // var mytoken = document.getElementById('mytoken');
      //   that.token = token.message;
      //   }, false);



      this.productID = navParams.get('productID');
      this.productName = navParams.get('productName');
      this.price = navParams.get('price');
      this.transaction_start_date = navParams.get('transaction_start_date');
      this.transaction_end_date = navParams.get('transaction_end_date');
      this.transaction_start_time = navParams.get('transaction_start_time');
      this.transaction_end_time = navParams.get('transaction_end_time');
      this.number_activity_reserved = navParams.get('number_activity_reserved');
      this.guestName = navParams.get('guestName');
      this.guestEmail = navParams.get('guestEmail');
      this.guestMobile = navParams.get('guestMobile');
      this.deviceID = this.device.uuid;
      this.amount = this.price * this.number_activity_reserved;
      console.log(this.transaction_start_time, this.transaction_end_time);
      this.getUserStatus();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  getUserStatus(){
    this.httpProvider.hasLoggedIn().then(hasLoggedIn => {
      console.log(hasLoggedIn);
      this.hasLoggedIn  = hasLoggedIn;
        if(hasLoggedIn){
          this.httpProvider.getAzureID().then(azure =>{
            this.azure_id = azure;
            this.getUserData();
            
          });
        }else{
         console.log('User not logged in');
        }
        
    })
  }
  
  getUserData(){
    this.httpProvider.getJsonData(this.endpoint+this.azure_id).subscribe(
      result => {
          console.log(result);
          this.user_id = result[0].id;
         
      }
    )
  }

  pay(){
    if(this.hasLoggedIn == true){
      this.makeReservation();
    }else{
      //this.presentAlert("You need to sign in");
      this.createGuest();
    }
  }

  createGuest(){
    this.httpProvider.addItem(this.guestEndpoint, JSON.stringify({device_id: this.deviceID, email: this.guestEmail, phone: this.guestMobile}))
      .subscribe(data =>{
        console.log(data);
        this.guestId = data.id;
        this.makeReservation();
      });
  }

  makeReservation(){
    this.httpProvider.addItem(this.reservationEndpoint, JSON.stringify({
      user_id: this.user_id,
      product_id: this.productID,
      transaction_date: Date.now(),
      transaction_start_date: this.transaction_start_date,
      transaction_end_date: this.transaction_end_date,
      transaction_start_time: this.transaction_start_time,
      transaction_end_time: this.transaction_end_time,
      number_activity_reserved: this.number_activity_reserved,
      nbr_in_party: 0,
      nbr_in_adult: this.number_activity_reserved,
      nbr_children: 0,
      misc_trip_name: this.productName,
      price: this.price,
      guest_id: this.guestId 
    })).subscribe(data => {
        console.log(data);
        this.navCtrl.push(ModifyReservationPage, {reservation: data});
    });
  }

  presentAlert(message) { 
    let alert = this.alertCtrl.create({
      title: 'Ups!!',
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  showMe() { 
    this.httpProvider.updateItem(this.cardConnectEnpoint, JSON.stringify({
      merchid: this.merchid,
      accttype: this.acctype,
      orderid: this.orderid,
      account: this.account,
      expiry: this.expiry,
      amount: this.amount,
      currency: this.currency,
      name: this.name,
      address: this.address,
      city: this.city,
      region: this.region,
      country: this.country,
      postal: this.postal,
      ecomind: this.ecomind,
      cvv2: this.cvv2,
      tokenize: this.tokenize,
      capture: this.capture
    })).subscribe(data => {
      console.log(data);
      this.pay();
    }); 
}


}
