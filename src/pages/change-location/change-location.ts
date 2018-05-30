import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';


declare var google;

@IonicPage()
@Component({
  selector: 'page-change-location',
  templateUrl: 'change-location.html',
})
export class ChangeLocationPage {

  searchTerm:any;
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private storage: Storage,
    private nativeGeocoder: NativeGeocoder,
    private geolocation: Geolocation,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeLocationPage');
  }



  dismiss() {
    this.viewCtrl.dismiss();
  }
  close() {
    this.viewCtrl.dismiss('none');
  }


  public getLocation(){
    if(this.searchTerm != null){
      console.log("Diferente");
      this.nativeGeocoder.forwardGeocode(this.searchTerm)
  .then((coordinates: NativeGeocoderForwardResult) => {
    
    console.log(this.searchTerm);
    console.log(coordinates.latitude, coordinates.longitude);
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

  public getCurrentLocation(){
    this.geolocation.getCurrentPosition().then((resp) =>{
      this.saveCoords(resp.coords.latitude, resp.coords.longitude);
        }).catch((error) => {
          console.log('Error getting location', error);
        });
  }

  detail(item){
    console.log(item);
    this.searchTerm = item.description;
  }

  ngOnInit() {


   

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["(cities)"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }else{
            console.log("place", place.geometry.location.lat());
            this.searchTerm = place.formatted_address;
          }

        });
      });
    });
  }
  

}
