import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { ReservationPage } from '../reservation/reservation';
import { BookingInquiryPage } from '../booking-inquiry/booking-inquiry';
import { ChangeLocationPage } from '../change-location/change-location';
import { Storage } from '@ionic/storage';
import { FeedPage } from '../feed/feed';
import { HomePage } from '../home/home';

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
  public datesEnd:any = [];
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
  enableDates:boolean = false;
  loading:any;
  reloading:boolean = true;
  enableInquiry:boolean = false;
  public timeStarts = '';
  public timeEnd = '';
  enableEndDate:boolean = false;
  pricePlan:any;
  hourly:boolean = false;
  pricingEndpoint:any = 'product/';
  public prices:any = [];

  lat:any;
  lng:any;
  root:any;
  stars:any;
  enablePicker:boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private httpProvider: UsersProvider,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private storage: Storage) {
      this.loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img width="150" src="assets/imgs/placeholder.png" />
        <br>
        <h1 class="loader-text-center">Loading...</h1>`,
      });
      this.loading.present();
      var today = new Date();
      var dd:any = today.getDate();
      var mm:any = today.getMonth()+1;
      var yyyy = today.getFullYear();
      this.timeStarts = yyyy + '-' + mm + '-' + dd;
      this.timeEnd = yyyy + '-' + mm + '-' + dd;
  }

  ngOnInit(){ 
      this.operator_name = this.navParams.get('operator');
      this.productName = this.navParams.get('product').name;
      this.price = this.navParams.get('product').price;
      this.productID = this.navParams.get('product').product_id;
      this.lat = this.navParams.get('product').lat;
      this.lng = this.navParams.get('product').lot;
      this.pricePlan = this.navParams.get('product').price_plan;
      this.stars = this.navParams.get('stars');

      
      //this.getDates();
      this.getStatus();
      this.getPricing();
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
    this.navCtrl.popToRoot();
  }

  getDates(timeStart?){
    if(timeStart != null){
      var url = this.endpoint + '7722/' + timeStart;
    }else{
      var url = this.endpoint + '7722';
    }
    this.httpProvider.getJsonData(url).subscribe(result => {
        console.log("Dates", result.length);
        this.loading.dismiss();
        this.reloading = false;
        if (result.length > 0){
          this.getSingleDate(result);
          this.enableDates = true;
        }else{
          console.log('Booking Inquiry');
          this.enableInquiry = true;
          this.enableDates = false;
        }
        //this.dates = result;
    });

  }

  getEndDates(timeStart?){
    if(timeStart != null){
      var url = this.endpoint + '7722/' + timeStart;
    }else{
      var url = this.endpoint + '7722';
    }
    this.httpProvider.getJsonData(url).subscribe(result => {
        console.log("Dates", result.length);
        this.loading.dismiss();
        this.reloading = false;
        if (result.length > 0){
          this.getSingleEndDate(result);
          this.enableEndDate = true;
        }else{
          console.log('Booking Inquiry');
          this.enableInquiry = true;
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
       this.startDate = this.dates[0].date;

      }

    }
  
  }

  getSingleEndDate(array){
    console.log("Longitud", array.length);
    for(var date = 0; date < array.length; date++){
      console.log(array[date], date);
      if (date < 3){
        console.log(array[date]);
       this.datesEnd.push(array[date]);
       this.endDate = this.dates[1].date;

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
            this.root = FeedPage;
          });
        }else{
          this.enable = false;
          this.root = HomePage;
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

firstTab(value){
  this.enableFirst = true;
  this.enableThird = false;
  this.enableSecond = false;
  this.startDate = value;
  console.log(this.startDate);

}

secondTab(value){
  this.enableFirst = false;
  this.enableThird = false;
  this.enableSecond = true;
  this.startDate = value;
  console.log(this.startDate);

}

thirdTab(value){
  this.enableFirst = false;
  this.enableSecond = false;
  this.enableThird = true;
  this.startDate = value;
  console.log(this.startDate);
}

secondEndTab(value){
  this.enableFirst = false;
  this.enableThird = false;
  this.enableSecond = true;
  this.endDate = value;
  console.log(this.endDate);

}

thirdEndTab(value){
  this.enableFirst = false;
  this.enableSecond = false;
  this.enableThird = true;
  this.endDate = value;
  console.log(this.endDate);
}

enableTabs(){
  if(this.startHour != null){
    if(this.hourly != true){
      console.log("clicked");
      this.loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img width="150" src="assets/imgs/placeholder.png" />
        <br>
        <p class="loader-text-center">Loading End Dates...</p>`,
      });
      this.loading.present();
    this.getEndDates(this.startDate);
    this.disable = false;
    this.disableFirst = true;
    this.enableFirst = false;
    this.enableThird = false;
    this.enableSecond = true;
    this.secondColor = 'orange-bg orange-border';
    this.firstColor = 'orange-border';
    this.rowText = 'end';
    this.enableContinue = false;
    this.enableDates = false;
    //this.enableEndDate = true;
    }else{
      this.endDate = '';
      this.endHour = '';
      this.goToReservation();
    }
   
 

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
    title: 'Oops!',
    subTitle: message,
    buttons: ['Dismiss']
  });
  alert.present();
}
goToReservation(){
  this.navCtrl.push(ReservationPage, {
    productID: this.productID,
    operatorName: this.operator_name,
    productName: this.productName,
    price: this.price,
    startDate: this.startDate,
    startHour: this.startHour,
    endDate: this.endDate,
    endHour: this.endHour,
    reservationCount: this.reserveCount,
    lat: this.lat,
    lng: this.lng,
    pricePlan: this.pricePlan,
    stars: this.stars
  });
}
reservate(){
  if(this.endHour != null){
    this.goToReservation();
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

  // console.log(time[0] + time[1] + time[2] + time[5]);

  return time[0] + time[1] + time[2] + time[5]; // return adjusted time or original string
}

// openModal() {

//   let modal = this.modalCtrl.create(ChangeLocationPage);
//   modal.present();
//   modal.onDidDismiss(() => {
//     this.getStartDate();
//     this.loading = this.loadingCtrl.create({
//       content: "Please wait...",
//     });
//     this.loading.present();
//     this.enableDates = false;
//     this.dates = [];
//   });
// }

updateDate(){
  this.loading = this.loadingCtrl.create({
    spinner: 'hide',
    content: `<img width="150" src="assets/imgs/placeholder.png" />
    <br>
    <h1 class="loader-text-center">Loading...</h1>`,
  });
  this.loading.present();
  this.enableDates = false;
  this.dates = [];
  this.getDates(this.timeStarts);
}

updateEndDate(){
  this.loading = this.loadingCtrl.create({
    spinner: 'hide',
    content: `<img width="150" src="assets/imgs/placeholder.png" />
    <br>
    <h1 class="loader-text-center">Loading...</h1>`,
  });
  this.loading.present();
  this.enableDates = false;
  this.datesEnd = [];
  this.getEndDates(this.timeEnd);
}

// getStartDate(){
//   this.storage.get('startDate').then((val) => {
//     console.log(val);
//     if(val != null){
//         this.getDates(val);
//     }

//   });
// }


  getPricing(){
    
    this.httpProvider.getJsonData(this.pricingEndpoint + this.productID + '/prices')
      .subscribe(result => {
        console.log(result);
        if(result.length > 0){
          this.prices = result;
          this.getDates();
        }else{
          this.prices = result;
          this.enableInquiry = true;
          this.enableDates = false;  
          this.loading.dismiss();
        }
      });
  }

  choosePrice(price, pricePlan){
    console.log(price, pricePlan);
    this.price = price;
    this.pricePlan = pricePlan;
    if(pricePlan.includes('Hour') == true){
        this.hourly = true;
      }else{
        this.hourly = false;
      }
    this.enablePicker = true;
  }

}
