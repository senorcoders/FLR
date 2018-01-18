import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';


@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  azure_id:any;
  userID:any; 
  userEndpoint:any = 'user/';
  favorites:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private httpProvider: UsersProvider) {
      this.getStatus();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
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
          this.getFavorites();
      });
  }

  getFavorites(){
    this.httpProvider.getJsonData(this.userEndpoint + this.userID + '/favorites-products')
      .subscribe(result => {
        this.favorites = result;
      });
  }

}
