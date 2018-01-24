import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

@IonicPage()
@Component({
  selector: 'page-change-location',
  templateUrl: 'change-location.html',
})
export class ChangeLocationPage {

  searchTerm:any;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private storage: Storage,
    private nativeGeocoder: NativeGeocoder) {
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeLocationPage');
  }



  dismiss() {
    this.viewCtrl.dismiss();
  }


  public getLocation(){
    if(this.searchTerm != null){
      console.log("Diferente");
      this.nativeGeocoder.forwardGeocode(this.searchTerm)
  .then((coordinates: NativeGeocoderForwardResult) => {
    
    console.log(this.searchTerm);
    this.saveCoords(coordinates.latitude, coordinates.longitude);
  })
  .catch((error: any) => console.log(error));
    }else{
      this.dismiss();
    }
    
  }

  saveCoords(lat, lng){
    this.storage.set('customLat', lat);
    this.storage.set('customLng', lng);
    this.dismiss();
  }


  

}
