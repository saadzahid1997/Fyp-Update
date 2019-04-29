import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RetrieveHotelPage } from './retrieve-hotel';

@NgModule({
  declarations: [
    RetrieveHotelPage,
  ],
  imports: [
    IonicPageModule.forChild(RetrieveHotelPage),
  ],
})
export class RetrieveHotelPageModule {}
