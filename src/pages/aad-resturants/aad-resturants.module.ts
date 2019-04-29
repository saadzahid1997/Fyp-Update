import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AadResturantsPage } from './aad-resturants';

@NgModule({
  declarations: [
    AadResturantsPage,
  ],
  imports: [
    IonicPageModule.forChild(AadResturantsPage),
  ],
})
export class AadResturantsPageModule {}
