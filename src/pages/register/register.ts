import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { Storage } from '@ionic/storage';
import { FeedPage } from '../feed/feed';
import { Keyboard } from '@ionic-native/keyboard';



@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  azure_id:any;
  name:any;
  username:any;
  email:any;
  password:any;
  endpoint:any = 'user';
  HAS_LOGGED_IN = 'hasLoggedIn';
  photo_url:any = 'https://liveglam.com/wp-content/themes/liveglam-new/assets/img/avatar_placeholder.svg';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private httpProvider: UsersProvider,
    private storage: Storage,
    private readonly ngZone: NgZone,
    public alertCtrl: AlertController,
    private keyboard: Keyboard) {
      this.azure_id = 'sid:' + Date.now();
      this.keyboard.hideKeyboardAccessoryBar(false);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    this.httpProvider.addItem(this.endpoint, JSON.stringify({
      name: this.name,
      username: this.username,
      email:this.email,
      password: this.password,
      azure_id: this.azure_id,
      photo_url: this.photo_url
    })).subscribe(data => {
        console.log(data);
        this.storage.set('azureid', this.azure_id);	
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.storage.set('username', data[0].id);
        this.ngZone.run(() => this.navCtrl.setRoot(FeedPage));

    });

  }

  checkFields(){
    if(this.name != undefined && this.email != undefined && this.password != undefined && this.username != undefined){
      this.register();
    }else{
      this.presentAlert("All fields are required");
    }
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Required',
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
