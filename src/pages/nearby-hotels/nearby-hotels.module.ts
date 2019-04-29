import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NearbyHotelsPage } from './nearby-hotels';

@NgModule({
  declarations: [
    NearbyHotelsPage,
  ],
  imports: [
    IonicPageModule.forChild(NearbyHotelsPage),
  ],
})
export class NearbyHotelsPageModule {}
