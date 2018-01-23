import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UsersProvider } from '../providers/users/users';
import { FeedPage } from '../pages/feed/feed';
import { HttpModule } from '@angular/http';
import { LocationsPage } from '../pages/locations/locations';
import { IonicStorageModule } from '@ionic/storage';
import { ProductPage } from '../pages/product/product';
import { ProductListPage } from '../pages/product-list/product-list';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { FavoritesPage } from '../pages/favorites/favorites';
import { ReviewPage } from '../pages/review/review';
import { SingleReviewPage } from '../pages/single-review/single-review';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ReservationPage } from '../pages/reservation/reservation';
import { PaymentPage } from '../pages/payment/payment';
import { ModifyReservationPage } from '../pages/modify-reservation/modify-reservation';
import { ReservationListPage } from '../pages/reservation-list/reservation-list';
import { ReservationDetailPage } from '../pages/reservation-detail/reservation-detail';
import { BookingInquiryPage } from '../pages/booking-inquiry/booking-inquiry';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SocialShareProvider } from '../providers/social-share/social-share';
import { GoogleMaps } from '@ionic-native/google-maps';
import { MapPage } from '../pages/map/map';
import { TermsPage } from '../pages/terms/terms';
import { MomentModule } from 'angular2-moment';
import { RequestsPage } from '../pages/requests/requests';
import { ChangeLocationPage } from '../pages/change-location/change-location';
import { MapModalPage } from '../pages/map-modal/map-modal';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FeedPage,
    LocationsPage,
    ProductPage,
    ProductListPage,
    EditProfilePage,
    FavoritesPage,
    ReviewPage,
    SingleReviewPage,
    ReservationPage,
    PaymentPage,
    ModifyReservationPage,
    ReservationListPage,
    ReservationDetailPage,
    BookingInquiryPage,
    MapPage,
    TermsPage,
    RequestsPage,
    ChangeLocationPage,
    MapModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    Ionic2RatingModule,
    MomentModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FeedPage,
    LocationsPage,
    ProductPage,
    ProductListPage,
    EditProfilePage,
    FavoritesPage,
    ReviewPage,
    SingleReviewPage,
    ReservationPage,
    PaymentPage,
    ModifyReservationPage,
    ReservationListPage,
    ReservationDetailPage,
    BookingInquiryPage,
    MapPage,
    TermsPage,
    RequestsPage,
    ChangeLocationPage,
    MapModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersProvider,
    SocialSharing,
    SocialShareProvider,
    GoogleMaps
  ]
})
export class AppModule {}
