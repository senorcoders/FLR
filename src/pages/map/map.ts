import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, PopoverController, App} from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProductListPage } from '../product-list/product-list';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  //@ViewChild('map') element:ElementRef;

  base:any = 'http://138.68.19.227:3030/api/location/by_distance/';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public googleMaps: GoogleMaps, 
    public plt: Platform,
    private http: Http,
    public popoverCtrl: PopoverController,
    private app: App,
    private readonly ngZone: NgZone) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  ngAfterViewInit() {
    this.plt.ready().then(() => {
        this.http.get(this.base + '28.471346/-81.54047/1000')
        .map(res => res.json())
        .subscribe(locations => this.initMap(locations))
    });
  }

  initMap (locations) {
    let mapEle: HTMLElement = document.getElementById('map');

    
    let map: GoogleMap = this.googleMaps.create(mapEle);

    map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {

      let cameraCoordinates: LatLng = new LatLng(locations[0].lat, locations[0].lot);

      let cameraPosition = {
        target: cameraCoordinates,
        zoom: 17
      };

      map.animateCamera(cameraPosition);

      locations.forEach((location) => {

        let coordinates: LatLng = new LatLng(location.lat, location.lot);

        let markerOptions: MarkerOptions = {
          position: coordinates,
          icon: "assets/imgs/marker.png",
          title: location.operator_name
        };

        const marker = map.addMarker(markerOptions)
          .then((marker: Marker) => {
            marker.showInfoWindow();
            marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                //this.presentPopover(location.products, location.operator_name);
                this.ngZone.run(() => this.presentPopover(location.products, location.operator_name));
              });
            });

      });
    })
  }

  presentPopover(product, operator) {
    // this.app.getRootNav().push(ProductListPage, {
    //   'product':product,
    //   'operator': operator});
    
    let popover = this.popoverCtrl.create(
      ProductListPage, {
        'product':product,
        'operator': operator
      }, {cssClass: 'product-popover'} );
    popover.present();
  }


}
