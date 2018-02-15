import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { ProductPage } from '../product/product';
import { BookingInquiryPage } from '../booking-inquiry/booking-inquiry';


@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
  operatorID:any;
  operator:any;
  stars:any;
  public products:any = [];
  count_stars:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private httpProvider: UsersProvider,
    public viewCtrl: ViewController,
    public app: App) {
      this.products = navParams.get('product');
      this.operator = navParams.get('operator');
      this.stars = navParams.get('stars');
      this.count_stars = navParams.get('count_stars');

      console.log("Estrellas", this.stars);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }

  goToDetail(product){
    this.navCtrl.push(ProductPage, {
      'product': product,
      'operator': this.operator,
      'stars': this.stars,
      "count_stars": this.count_stars

    });
    //this.viewCtrl.dismiss();
  } 

  request(){
    this.navCtrl.push(BookingInquiryPage, {
      operatorName: this.operator,
      'stars': this.stars,
      "count_stars": this.count_stars

    });
  }


}
