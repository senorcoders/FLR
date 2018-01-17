import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { PaymentPage } from '../payment/payment';


@IonicPage()
@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html',
})
export class ReservationPage {

  //price:number = 65;
  qty:number;
  gap:number = 3.50;
  coupon:any;
  enable:boolean = false;
  newPrice:number;
  azure_id:any;
  endpoint:any = 'user/azure_id/';
  public name:any;
  public email:any;
  user_id:any;
  mobile:any;
  productID:any;
  operatorName:any;
  productName:any;
  price:any;
  startDate:any;
  startHour:any;
  endDate:any;
  endHour:any;
  reservationCount:any;
  couponEndpoint:any = 'coupon/';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private httpProvider: UsersProvider) {
      this.productID = navParams.get('productID');
      this.operatorName = navParams.get('operatorName');
      this.productName = navParams.get('productName');
      this.price = navParams.get('price');
      this.startDate = navParams.get('startDate');
      this.startHour = navParams.get('startHour');
      this.endDate = navParams.get('endDate');
      this.endHour = navParams.get('endHour');
      this.qty = navParams.get('reservationCount');
      this.getUserStatus();

  }
  buttonLabel="Continue";


  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationPage');
  }

  boxDialog(){
   
    const alert = this.alertCtrl.create({
      subTitle: 'This helps us provide you with a safer and more secure booking experience, coupled with 24x7 customer support.',
      buttons: ['OK'],
      cssClass: 'alertReservation'
    });
    alert.present();
  
  
}

presentAlert(message) {
  let alert = this.alertCtrl.create({
    title: 'Upsss!!',
    subTitle: message,
    buttons: ['Dismiss']
  });
  alert.present();
}


backToEdit(){
  this.navCtrl.pop();
}

getSubtotal(){
  return this.price * this.qty;
}

getTax(){
  let subtotal = this.price * this.qty;
  return (subtotal * 0.07).toFixed(2);
}

getTotal(){
  return (this.price * this.qty) + ((this.price * this.qty) * 0.07) + this.gap;
}

getDiscount(){
  
  this.httpProvider.getJsonData(this.couponEndpoint + this.coupon + '/' + this.productID)
      .subscribe(result => {
          if(result.message === 'ok'){
            let discount = this.getTotal() * (result.amount / 100);
            this.enable = true;
            this.newPrice = this.getTotal() - discount;
          }else{

            this.presentAlert('The coupon is invalid');
          }
      });
}

getUserStatus(){
  this.httpProvider.hasLoggedIn().then(hasLoggedIn => {
    console.log(hasLoggedIn);
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
        this.email = result[0].email;
        this.name = result[0].name;
        this.user_id = result[0].id;
        console.log(this.email);
    }
  )
}


checkRequireFields(){
  console.log(this.name);
    if(this.name != undefined && this.email != undefined && this.mobile != undefined){
        console.log("You can go and pay!");
        this.navCtrl.push(PaymentPage, {
          productID: this.productID,
          productName: this.productName,
          price: this.price,
          transaction_start_date: this.startDate,
          transaction_end_date: this.endDate,
          transaction_start_time: this.startHour,
          transaction_end_time: this.endHour,
          number_activity_reserved: this.qty
        });
    }else{
      console.log("You need to enter your information");
      this.presentAlert("Fill the information");
    }
}


}
