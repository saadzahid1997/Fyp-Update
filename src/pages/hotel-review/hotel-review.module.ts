import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelReviewPage } from './hotel-review';

@NgModule({
  declarations: [
    HotelReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(HotelReviewPage),
  ],
})
export class HotelReviewPageModule {}
