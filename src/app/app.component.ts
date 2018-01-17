import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { UsersProvider } from '../providers/users/users';
import { FeedPage } from '../pages/feed/feed';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { FavoritesPage } from '../pages/favorites/favorites';
import { ReviewPage } from '../pages/review/review';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;
  azure_id:any;
  photo_url:any;
  username:any;
  //client:any;
  pages: Array<{title: string, component: any}>;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public httpProvider: UsersProvider,) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.httpProvider.hasLoggedIn().then(hasLoggedIn => {
      console.log(hasLoggedIn);
        if(hasLoggedIn){
          this.rootPage = FeedPage;
          this.httpProvider.getAzureID().then(azure =>{
            this.azure_id = azure;
            console.log(azure);
            this.getPhotoandUserName();
          });
        }else{
          this.rootPage = HomePage;
        }
        
    })
    this.pages = [
      { title: 'Home', component: HomePage },
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  goToEditProfile(){
    this.nav.push(EditProfilePage);
  }

  goToFavorites(){
    this.nav.push(FavoritesPage);

  }

  goToReview(){
    this.nav.push(ReviewPage);
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

