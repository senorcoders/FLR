import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { ReservationPage } from '../reservation/reservation';
import { BookingInquiryPage } from '../booking-inquiry/booking-inquiry';

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  operator_name:any;
  productName:any;
  price:any;
  productID:any;
  endpoint:any = 'services-dates/next-dates/';
  public dates:any = [];
  enable:boolean;
  azure_id:any;
  userID:any;
  favEndpoint:any = 'favorite-product';
  userEndpoint:any = 'user/';
  liked:boolean;
  enableFirst:boolean = true;
  enableSecond:boolean = false;
  enableThird:boolean = false;
  disable:boolean = true;
  endDate:any;
  endHour:any;
  disableFirst:boolean = false;
  secondColor:any = 'orange-border';
  firstColor:any = 'orange-bg orange-border';
  rowText:string = 'start';
  reserveCount:number = 1;
  startDate:any;
  startHour:any;
  enableContinue:boolean = true;
  enableDates:boolean;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private httpProvider: UsersProvider,
    private alertCtrl: AlertController) {
  }

  ngOnInit(){ 
    this.operator_name = this.navParams.get('operator');
      this.productName = this.navParams.get('product').name;
      this.price = this.navParams.get('product').price;
      this.productID = this.navParams.get('product').product_id;
      console.log(this.navParams.get('product').name);
      this.getDates();
      this.getStatus();
  }

  timesCount(){
    this.reserveCount++;
  }

  dicreaseCount(){
    if(this.reserveCount > 1){
      this.reserveCount--;
    }
  }

  goToBookReservation(){
    console.log('click');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

  onButtonGroupClick($event){
  	console.log($event);
    let clickedElement = $event.target || $event.srcElement;

    if( clickedElement.nodeName === "BUTTON" ) {

      let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".orange-bg");
      // if a Button already has Class: .active
      if( isCertainButtonAlreadyActive ) {
        isCertainButtonAlreadyActive.classList.remove("orange-bg");
      }

      clickedElement.className += " orange-bg";
    }

  }
 
  back(){
    this.navCtrl.pop();
  }

  getDates(){
    this.httpProvider.getJsonData(this.endpoint + '7722').subscribe(result => {
        console.log("Dates", result.length);
        if (result.length > 0){
          this.getSingleDate(result);
          this.enableDates = true;
        }else{
          console.log('Booking Inquiry');
          this.enableDates = false;
        }
        //this.dates = result;
    });

  }
  getSingleDate(array){
    console.log("Longitud", array.length);
    for(var date = 0; date < array.length; date++){
      console.log(array[date], date);
      if (date < 3){
        console.log(array[date]);
       this.dates.push(array[date]);
      }else{
        this.startDate = this.dates[0].date;
      }

    }
  
  }


  getStatus(){
    this.httpProvider.hasLoggedIn().then(hasLoggedIn => {
      console.log(hasLoggedIn);
        if(hasLoggedIn){
          this.httpProvider.getAzureID().then(azure =>{
            this.enable = true;
            this.azure_id = azure;
            console.log(azure);
            this.getUserID();
          });
        }else{
          this.enable = false;
        }
        
    });
  }


  getUserID(){
    this.httpProvider.getJsonData('user/azure_id/'+this.azure_id).subscribe(
      result =>{
        console.log(result);
          this.userID = result[0].id;
          this.getLikeStatus();
      });
  }


  addToFav(){
    this.httpProvider.addItem(this.favEndpoint, JSON.stringify({product_id:this.productID, user_id:this.userID}))
      .subscribe(data => {
        console.log(data);
        this.liked = true;
      });
  }


getLikeStatus(){
  this.httpProvider.getJsonData(this.userEndpoint + this.userID + '/favorites-products?product_id=' + this.productID)
    .subscribe(result => {
      console.log(result);
      if (result != ""){
        this.liked = true;
      }else{
        this.liked = false;
      }
    });
}

secondTab(value){
  this.enableFirst = false;
  this.enableThird = false;
  this.enableSecond = true;
  this.endDate = value;
  console.log(this.endDate);

}

thirdTab(value){
  this.enableFirst = false;
  this.enableSecond = false;
  this.enableThird = true;
  this.endDate = value;
  console.log(this.endDate);
}

enableTabs(){
  if(this.startHour != null){
    console.log("clicked");
  this.disable = false;
  this.disableFirst = true;
  this.enableFirst = false;
  this.enableSecond = true;
  this.secondColor = 'orange-bg orange-border';
  this.firstColor = 'orange-border';
  this.rowText = 'end';
  this.endDate = this.dates[1].date;
  this.enableContinue = false;

  }else{
    this.presentAlert("You need to choose a start hour");
  }
  
}

setStartHour(value){
  this.startHour = value;
  console.log(this.startHour);
}

setEndHour(value){
  this.endHour = value;
  console.log(this.startHour);
}

toggleEndDate(value){
  this.endDate = value;
  console.log(this.endDate);
}

presentAlert(message) {
  let alert = this.alertCtrl.create({
    title: 'Upsss!!',
    subTitle: message,
    buttons: ['Dismiss']
  });
  alert.present();
}

reservate(){
  if(this.endHour != null){
    this.navCtrl.push(ReservationPage, {
      productID: this.productID,
      operatorName: this.operator_name,
      productName: this.productName,
      price: this.price,
      startDate: this.startDate,
      startHour: this.startHour,
      endDate: this.endDate,
      endHour: this.endHour,
      reservationCount: this.reserveCount
    });
  }else{
    this.presentAlert("You need to choose a end hour");

  }
}

request(){
  this.navCtrl.push(BookingInquiryPage, {
    productID: this.productID,
    operatorName: this.operator_name,
    productName: this.productName,
  });
}

tConvert (time) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}

}
