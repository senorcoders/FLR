import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
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
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder} from '@ionic-native/native-geocoder';
import { Device } from '@ionic-native/device';
import { Keyboard } from '@ionic-native/keyboard';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { GooglePlacesAutocompleteComponentModule } from 'ionic2-google-places-autocomplete';
import { Diagnostic } from '@ionic-native/diagnostic';
import { ThankInquiryPage } from '../pages/thank-inquiry/thank-inquiry';
import { ReviewSummaryPage } from '../pages/review-summary/review-summary';
import {ProgressBarModule} from "angular-progress-bar"
import { PrivacyPage } from '../pages/privacy/privacy';
import { BookingInquiryPageModule } from '../pages/booking-inquiry/booking-inquiry.module';
import { ChangeLocationPageModule } from '../pages/change-location/change-location.module';
import { EditProfilePageModule } from '../pages/edit-profile/edit-profile.module';
import { FavoritesPageModule } from '../pages/favorites/favorites.module';
import { FeedPageModule } from '../pages/feed/feed.module';
import { LocationsPageModule } from '../pages/locations/locations.module';
import { LoginPageModule } from '../pages/login/login.module';
import { MapPageModule } from '../pages/map/map.module';
import { MapModalPageModule } from '../pages/map-modal/map-modal.module';
import { ModifyReservationPageModule } from '../pages/modify-reservation/modify-reservation.module';
import { PaymentPageModule } from '../pages/payment/payment.module';
import { PrivacyPageModule } from '../pages/privacy/privacy.module';
import { ProductPageModule } from '../pages/product/product.module';
import { ProductListPageModule } from '../pages/product-list/product-list.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { RequestsPageModule } from '../pages/requests/requests.module';
import { ReservationPageModule } from '../pages/reservation/reservation.module';
import { ReservationDetailPageModule } from '../pages/reservation-detail/reservation-detail.module';
import { ReservationListPageModule } from '../pages/reservation-list/reservation-list.module';
import { ReviewPageModule } from '../pages/review/review.module';
import { ReviewSummaryPageModule } from '../pages/review-summary/review-summary.module';
import { SingleReviewPageModule } from '../pages/single-review/single-review.module';
import { TermsPageModule } from '../pages/terms/terms.module';
import { ThankInquiryPageModule } from '../pages/thank-inquiry/thank-inquiry.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    BookingInquiryPageModule,
    ChangeLocationPageModule,
    EditProfilePageModule,
    FavoritesPageModule,
    FeedPageModule,
    LocationsPageModule,
    LoginPageModule,
    MapPageModule,
    MapModalPageModule,
    ModifyReservationPageModule,
    PaymentPageModule,
    PrivacyPageModule,
    ProductPageModule,
    ProductListPageModule,
    RegisterPageModule,
    RequestsPageModule,
    ReservationPageModule,
    ReservationDetailPageModule,
    ReservationListPageModule,
    ReviewPageModule,
    ReviewSummaryPageModule,
    SingleReviewPageModule,
    TermsPageModule,
    ThankInquiryPageModule
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
    MapModalPage,
    LoginPage,
    RegisterPage,
    ThankInquiryPage,
    ReviewSummaryPage,
    PrivacyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersProvider,
    SocialSharing,
    SocialShareProvider,
    GoogleMaps,
    Geolocation,
    NativeGeocoder,
    Device,
    Keyboard,
    Diagnostic,
  ]
})
export class AppModule {}
