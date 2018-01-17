import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';


@IonicPage()
@Component({
  selector: 'page-single-review',
  templateUrl: 'single-review.html',
})
export class SingleReviewPage {

  operatorID:any;
  comment:any;
  endpoint:any = 'comments-operator';
  disable:boolean = false;
  userID:any;
  azure_id:any;
  userEndpoint:any = 'user';
  rate:any;
  startEndpoint:any = 'stars-operator';

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpProvider: UsersProvider) {
    console.log("Producto", navParams.get('product').operatorID);
    this.operatorID = navParams.get('product').operatorID;
    this.getStatus();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingleReviewPage');
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
        console.log("User ID", result);
          this.userID = result[0].id;
      });
  }

  

  addComment(){
    console.log(this.comment);
    if(this.comment != null){
      this.disable = true;

      this.httpProvider.addItem(this.endpoint, JSON.stringify({user_id:this.userID, operator_id:this.operatorID, content:this.comment}))
        .subscribe(data =>{
          console.log(data);
          this.disable = false;
        });

    }

  }

  addStars(){
    this.httpProvider.addItem(this.startEndpoint, JSON.stringify({user_id:this.userID, operator_id:this.operatorID, numStars:this.rate}))
      .subscribe(data =>{
        console.log(data);
      });
  }

  onModelChange($event){
    console.log($event);
    console.log(this.rate);
    this.addStars();
  }

}
