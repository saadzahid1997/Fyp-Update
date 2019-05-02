import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserHotelsPage } from './user-hotels';

@NgModule({
  declarations: [
    UserHotelsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserHotelsPage),
  ],
})
export class UserHotelsPageModule {}
