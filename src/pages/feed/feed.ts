import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationsPage } from '../locations/locations';
import { ReservationListPage } from '../reservation-list/reservation-list';
import { ReviewPage } from '../review/review';
import { FavoritesPage } from '../favorites/favorites';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { UsersProvider } from '../../providers/users/users';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  azure_id:any;
  photo_url:any;
  username:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private httpProvider: UsersProvider,
    public menuCtrl: MenuController) {
      this.getStatus();
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, "flrMenu");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
  }

  goToNearbyActivities(){
    this.navCtrl.push(LocationsPage);
  }

  getStatus(){
    this.httpProvider.hasLoggedIn().then(hasLoggedIn => {
      console.log(hasLoggedIn);
        if(hasLoggedIn){
          this.httpProvider.getAzureID().then(azure =>{
            this.azure_id = azure;
            console.log(azure);
            this.getPhotoandUserName();
          });
        }else{
          console.log("not login");
        }
        
    })
  }

   goToEditProfile(){
    this.navCtrl.push(EditProfilePage);
  }

  goToFavorites(){
    this.navCtrl.push(FavoritesPage);

  }

  goToReview(){
    this.navCtrl.push(ReviewPage);
  }

  goToActivities(){
    this.navCtrl.setRoot(FeedPage);
  }

  goToReservations(){
    this.navCtrl.push(ReservationListPage);
  }

  getPhotoandUserName(){
    this.httpProvider.getJsonData('user/azure_id/'+this.azure_id).subscribe(
      result =>{
        console.log(result);
          this.photo_url = result[0].photo_url;
          this.username = result[0].username;
      });
  }

}
