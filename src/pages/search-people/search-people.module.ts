import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPeoplePage } from './search-people';

@NgModule({
  declarations: [
    SearchPeoplePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPeoplePage),
  ],
})
export class SearchPeoplePageModule {}
