import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { FeedPage } from '../../pages/feed/feed';
import { App } from 'ionic-angular';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
declare var WindowsAzure: any;

@Injectable()
export class UsersProvider {
  HAS_LOGGED_IN = 'hasLoggedIn';
	base:string = 'http://138.68.19.227:3030/api/';
	client: any;
	userid: string;
  loggedIn: boolean = false;
	appUrl:any = 'https://find-local-rentals.azurewebsites.net';
	fbToken:any;
	user:any;
	azure_id:any;
	provider:any;

  constructor(public http: Http, private storage: Storage, public app: App) {
    console.log('Hello UsersProvider Provider');
  }

  login(provider: string) {
    console.log(provider);
		this.provider = provider;
		this.client = new WindowsAzure.MobileServiceClient(this.appUrl);
		this.client.login(provider).done(this.loginResponse.bind(this));
  }
  
  async loginResponse(response) {
    let nav = this.app.getActiveNav();	
    console.log(response);
    console.log(this.client);
    this.storage.set('azureid', response.userId);	
    this.azure_id = response.userId;
  
    this.getJsonData('user/azure_id/'+response.userId).subscribe(
      result => {
        console.log(result);
        if (result != ""){
          console.log(result, "Usuario ya existe");
          nav.setRoot(FeedPage);
          this.storage.set(this.HAS_LOGGED_IN, true);
          
        }else{
          this.requestToken();
        }
        
      })
    
  }

  requestToken(){
    var url = this.client.applicationUrl + '/.auth/me';
    var headers = new Headers();
  
    headers.append('X-ZUMO-AUTH', this.client.currentUser.mobileServiceAuthenticationToken);
    let options = new RequestOptions({ headers: headers });	
  
    this.http.get(url, options).subscribe(
      data => {
        console.log("User", data);
        let token = JSON.parse(data['_body']);
        
        if (this.provider === 'facebook'){
          this.fbToken = token[0].access_token;
          this.getFBuserData(this.fbToken);
        }else{
          this.saveNewUser('user', token[0].user_id, token[0].user_id, 'not defined yet', token[0].user_claims[9].val, this.azure_id);
          
          //this.getTwitterData(token[0].user_id);
        }
  
        
      }
    )
  }

  getFBuserData(token){
    this.http.get('https://graph.facebook.com/me?fields=id,name,picture,email,birthday,first_name&access_token='+token).subscribe(
      user => {
        console.log(user);
        this.user = JSON.parse(user['_body']);
        console.log("Valores a mandar", this.user.name);
        this.saveNewUser('user', this.user.name, this.user.first_name, this.user.email, this.user.picture.data.url, this.azure_id);
  
      }
    )
  }

  getTwitterData(twitterId){
    this.http.get('https://api.twitter.com/1.1/account/verify_credentials.json').subscribe(
      user => {
        console.log(user);
        //this.user = JSON.parse(user['_body']);
        //this.saveNewUser('user', this.user.name, this.user.first_name, this.user.email, this.user.picture.data.url, this.azure_id);
  
      }
    )
  }

  getUsername(): Promise<string> {  
    return this.storage.get('username').then((value) => {
      return value;
    });
  }
  
  getAzureID(): Promise<string> {  
    return this.storage.get('azureid').then((value) => {
      return value;
    });
  }

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
}

  getJsonData(endpoint){
    return this.http.get(this.base + endpoint).map(res => res.json());
}

saveNewUser(endpoint, name, username, email, photo_url, azure_id):void{
  let nav = this.app.getActiveNav();

  var headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8' );
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    let options = new RequestOptions({ headers: headers });
  let userData = {name: name, username: username, email: email, photo_url: photo_url, azure_id: azure_id};
  console.log(userData);
  this.http.post(encodeURI(this.base + endpoint), userData, options)
    .map(res => res.json())
    .subscribe(data => {
      console.log(data);
      this.storage.set(this.HAS_LOGGED_IN, true);
      this.storage.set('username', data.id);
      nav.setRoot(FeedPage);
    }, error => {
      console.log("Error", error);
    });
}

updateUser(endpoint, name,username, email, password, photo_url):void{
  var headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8' );
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  let userData = {name: name, username: username, email: email, photo_url: photo_url, password:password};
  console.log(userData);
    let options = new RequestOptions({ headers: headers });
    this.http.put(encodeURI(this.base + endpoint), userData, options)
    .subscribe(data => {
      console.log(data);
    }, error => {
      console.log("Error", error);
    });
}

addItem(endpoint, data){
  var headers = new Headers();
headers.append('Content-Type', 'application/json' );
headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  let options = new RequestOptions({ headers: headers });
  
  
    return this.http.post(this.base + endpoint, data, options)
  .map(res => res.json())
  .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

  //   .subscribe(data => {
  //     console.log("In senorcoders", data);
  //   }, error => {
  //     console.log("Error", error);
  //   });
}


load(endpoint){
console.log(this.base + endpoint);
return new Promise(resolve => {
  this.http.get(this.base + endpoint)
    .map(res => res.json())
    .subscribe(data => {
      console.log(data);
        resolve(data);
    });
});

}

}
