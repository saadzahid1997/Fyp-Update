import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserResturantsPage } from './user-resturants';

@NgModule({
  declarations: [
    UserResturantsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserResturantsPage),
  ],
})
export class UserResturantsPageModule {}
