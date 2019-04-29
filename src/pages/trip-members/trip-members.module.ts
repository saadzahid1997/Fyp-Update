import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripMembersPage } from './trip-members';

@NgModule({
  declarations: [
    TripMembersPage,
  ],
  imports: [
    IonicPageModule.forChild(TripMembersPage),
  ],
})
export class TripMembersPageModule {}
