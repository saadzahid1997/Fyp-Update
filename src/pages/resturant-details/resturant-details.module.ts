import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResturantDetailsPage } from './resturant-details';

@NgModule({
  declarations: [
    ResturantDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ResturantDetailsPage),
  ],
})
export class ResturantDetailsPageModule {}
