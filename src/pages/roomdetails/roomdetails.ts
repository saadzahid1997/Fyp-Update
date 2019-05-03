import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { roomService } from '../../app/services/rooms.service';

/**
 * Generated class for the RoomdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-roomdetails',
  templateUrl: 'roomdetails.html'
})
export default class RoomdetailsPage {
  roomDetails: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _viewCtrl: ViewController,
    private _room: roomService
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomdetailsPage');
    this.roomDetails = this.navParams.data.roomDetails
      ? this.navParams.data.roomDetails[0]
      : '';
    console.log('roomDetails');
  }

  sendEmail() {
    console.log('i am here..');
    const payload = {
      from: 'nodejs21@gmail.com',
      to: 'saadzahid537@gmail.com',
      subject: 'Room Reservaion',
      text: 'You room is reserved'
    };
    this._room.confirmBooking(payload).then(res => {
      console.log('Booked!!');
      console.log(res);
    });
  }

  back(response) {
    console.log('Exiting');
    this._viewCtrl.dismiss(response);
  }
}
