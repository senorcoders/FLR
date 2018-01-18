import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { UsersProvider } from '../providers/users/users';
import { FeedPage } from '../pages/feed/feed';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  

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
         
        }else{
          this.rootPage = HomePage;
        }
        
    })
    
  }




 

  
}

