import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import RoomdetailsPage from './roomdetails';
import { HTTP } from '@ionic-native/http/ngx';

@NgModule({
  declarations: [RoomdetailsPage],
  imports: [IonicPageModule.forChild(RoomdetailsPage)],
  providers: [HTTP]
})
export class RoomdetailsPageModule {}
