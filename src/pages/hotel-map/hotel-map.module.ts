import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelMapPage } from './hotel-map';

@NgModule({
  declarations: [
    HotelMapPage,
  ],
  imports: [
    IonicPageModule.forChild(HotelMapPage),
  ],
})
export class HotelMapPageModule {}
