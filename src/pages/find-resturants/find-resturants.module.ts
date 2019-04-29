import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindResturantsPage } from './find-resturants';

@NgModule({
  declarations: [
    FindResturantsPage,
  ],
  imports: [
    IonicPageModule.forChild(FindResturantsPage),
  ],
})
export class FindResturantsPageModule {}
