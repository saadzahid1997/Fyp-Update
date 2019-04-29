import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import AddHotelsPage from './addHotels';

@NgModule({
  declarations: [
    AddHotelsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddHotelsPage),
  ],
})
export class AddHotelsPageModule {}
