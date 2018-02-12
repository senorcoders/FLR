import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { UsersProvider } from '../providers/users/users';
import { FeedPage } from '../pages/feed/feed';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  gps:boolean;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public httpProvider: UsersProvider,
    private diagnostic: Diagnostic,
    private locationAccuracy: LocationAccuracy,
    private splashscreen: SplashScreen) {
    platform.ready().then(() => {
      console.log(platform.is('android'));
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if(platform.is('android')){
        let successCallback = (isAvailable) => { 
          console.log('Is available? ' + isAvailable); 
          if(isAvailable == true){
            this.gps = false;
          }else{
            this.gps = true;
          }
        };
        let errorCallback = (e) => console.error(e);
  
        this.diagnostic.isGpsLocationEnabled().then(successCallback).catch(errorCallback);
      }
      


    });

    this.httpProvider.hasLoggedIn().then(hasLoggedIn => {
      console.log(hasLoggedIn);
        if(hasLoggedIn){
          this.rootPage = FeedPage;
         
        }else{
          this.rootPage = HomePage;
        }
        
    });
    
  }



  enableGps(){
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      if(canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => console.log('Request successful'),
          error => console.log('Error requesting location permissions', error)
        );
      }
    
    });
  }
 
  closeOverlay(){
    this.gps = false;
    this.splashscreen.show();
    window.location.reload();

  }

  
}

