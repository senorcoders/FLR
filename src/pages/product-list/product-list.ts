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
  public products:any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private httpProvider: UsersProvider,
    public viewCtrl: ViewController,
    public app: App) {
      this.products = navParams.get('product');
      this.operator = navParams.get('operator');
      console.log(this.navCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }

  goToDetail(product){
    this.navCtrl.push(ProductPage, {
      'product': product,
      'operator': this.operator
    });
    //this.viewCtrl.dismiss();
  }

  request(){
    this.navCtrl.push(BookingInquiryPage, {
      operatorName: this.operator,
    });
  }


}
