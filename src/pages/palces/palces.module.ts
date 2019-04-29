import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PalcesPage } from './palces';

@NgModule({
  declarations: [
    PalcesPage,
  ],
  imports: [
    IonicPageModule.forChild(PalcesPage),
  ],
})
export class PalcesPageModule {}
