import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { SocialShareProvider } from '../../providers/social-share/social-share';


@IonicPage()
@Component({
  selector: 'page-booking-inquiry',
  templateUrl: 'booking-inquiry.html',
})
export class BookingInquiryPage {

  endpoint:any = 'user/azure_id/';
  public name:any;
  public email:any;
  user_id:any;
  mobile:any;
  productID:any;
  operatorName:any;
  productName:any;
  azure_id:any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private httpProvider: UsersProvider,
    private shareProvider: SocialShareProvider) {
      this.productID = navParams.get('productID');
      this.operatorName = navParams.get('operatorName');
      this.productName = navParams.get('productName');
      this.getUserStatus();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingInquiryPage');
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Upsss!!',
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
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
          console.log("Send request!");
          this.shareProvider.shareViaEmail(this.name + " " +  this.email + " " + this.mobile + " " + this.productID);
      }else{
        console.log("You need to enter your information");
        this.presentAlert("Fill the information");
      }
  }

}
