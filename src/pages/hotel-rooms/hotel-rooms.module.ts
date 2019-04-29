import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelRoomsPage } from './hotel-rooms';

@NgModule({
  declarations: [
    HotelRoomsPage,
  ],
  imports: [
    IonicPageModule.forChild(HotelRoomsPage),
  ],
})
export class HotelRoomsPageModule {}
