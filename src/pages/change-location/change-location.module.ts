import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeLocationPage } from './change-location';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    ChangeLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeLocationPage),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBmXK9M2OQCfZuPJdgxLzWkFcdPd_Zo7ZY",
      libraries: ["places"]
    })
  ],
})
export class ChangeLocationPageModule {}
