import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { ProductPage } from '../product/product';


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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }

  goToDetail(product){
    this.app.getRootNav().push(ProductPage, {
      'product': product,
      'operator': this.operator
    });
    this.viewCtrl.dismiss();
  }



}
