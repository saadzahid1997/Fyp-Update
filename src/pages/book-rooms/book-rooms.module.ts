import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookRoomsPage } from './book-rooms';

@NgModule({
  declarations: [
    BookRoomsPage,
  ],
  imports: [
    IonicPageModule.forChild(BookRoomsPage),
  ],
})
export class BookRoomsPageModule {}
