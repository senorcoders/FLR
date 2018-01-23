import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-change-location',
  templateUrl: 'change-location.html',
})
export class ChangeLocationPage {
  public timeStarts = '';
  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private storage: Storage) {
      var today = new Date();
      var dd:any = today.getDate();
      var mm:any = today.getMonth()+1;
      var yyyy = today.getFullYear();
      this.timeStarts = yyyy + '-' + mm + '-' + dd;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeLocationPage');
  }

  dismiss() {
    this.storage.set('startDate', this.timeStarts);
    this.viewCtrl.dismiss();
  }

}
