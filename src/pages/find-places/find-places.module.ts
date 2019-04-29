import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindPlacesPage } from './find-places';

@NgModule({
  declarations: [
    FindPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(FindPlacesPage),
  ],
})
export class FindPlacesPageModule {}
