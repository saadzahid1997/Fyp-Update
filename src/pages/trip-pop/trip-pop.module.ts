import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripPopPage } from './trip-pop';

@NgModule({
  declarations: [
    TripPopPage,
  ],
  imports: [
    IonicPageModule.forChild(TripPopPage),
  ],
})
export class TripPopPageModule {}
