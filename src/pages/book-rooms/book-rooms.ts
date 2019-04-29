import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HotelService } from '../../app/services/hotels.service';

/**
 * Generated class for the BookRoomsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book-rooms',
  templateUrl: 'book-rooms.html',
})
export class BookRoomsPage {
  luxury;
  numbeOfRooms;
  date;
  hotelId;
  constructor(public navCtrl: NavController, public navParams: NavParams, private hotelServ: HotelService) {
    this.hotelId = this.navParams.data.hotelId;
    this.date = Date.now()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookRoomsPage');
  }

  book() {
    this.hotelServ.bookHotel({luxury: this.luxury, numbeOfRooms: this.numbeOfRooms, date: this.date, status: 'pending'})
  }
}
