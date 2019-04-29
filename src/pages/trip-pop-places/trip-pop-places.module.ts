import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripPopPlacesPage } from './trip-pop-places';

@NgModule({
  declarations: [
    TripPopPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(TripPopPlacesPage),
  ],
})
export class TripPopPlacesPageModule {}
