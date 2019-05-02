import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import RoomdetailsPage from './roomdetails';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@NgModule({
  declarations: [RoomdetailsPage],
  imports: [IonicPageModule.forChild(RoomdetailsPage)],
  providers: [EmailComposer]
})
export class RoomdetailsPageModule {}
