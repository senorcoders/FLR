import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationsPage } from '../locations/locations';
import { UsersProvider } from '../../providers/users/users';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private httpProvider:UsersProvider) {

  }

  goToNearbyActivities(){
    this.navCtrl.push(LocationsPage);
  }

  socialLogin(provider){
    this.httpProvider.login(provider);
  }

}
