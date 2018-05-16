import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeLocationPage } from './change-location';
import { GooglePlacesAutocompleteComponentModule } from 'ionic2-google-places-autocomplete';

@NgModule({
  declarations: [
    ChangeLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeLocationPage),
    GooglePlacesAutocompleteComponentModule
  ],
})
export class ChangeLocationPageModule {}
