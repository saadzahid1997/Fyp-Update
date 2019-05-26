import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { roomService } from '../../app/services/rooms.service';

import { UserService } from '../../app/services/user.service';
import { HttpClient } from '@angular/common/http';

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
  hotelDetails: any;
  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _viewCtrl: ViewController,
    private _http: HttpClient,
    private _user: UserService
  ) {}

  ionViewDidLoad() {
    this._user.user$.subscribe(user => {
      this.user = user;
      console.log('user');
      console.log(this.user);
    });
    console.log('ionViewDidLoad RoomdetailsPage');
    this.roomDetails = this.navParams.data.roomDetails
      ? this.navParams.data.roomDetails[0]
      : '';
    this.hotelDetails = this.navParams.data.hotelDetails;
    console.log('roomDetails');
    console.log(this.roomDetails);
    console.log('hotelDetails');
    console.log(this.hotelDetails);
  }

  sendEmail() {
    // User Picture: ${this.user.fileURL}\n
    const message =
      'Hey! There is a reservation for room in your hotel ' +
      this.hotelDetails.hotelName +
      '\nUser Name: ' +
      this.user.displayName +
      '\nUser Phone: ' +
      this.user.phone +
      '\nUser Email: ' +
      this.user.userMail;
    // const message = `Hey! There is a reservation for room in your hotel ${
    //   this.hotelDetails.hotelName
    // }.
    // User Name: ${this.user.displayName}User Phone: ${
    //   this.user.phone
    // }User Email: ${this.user.userMail}`;
    const number = this.hotelDetails.hotelContactNo;
    // const number = '03125262249';
    const url = `http://api.smilesn.com/sendsms?hash=ae6bbae837163f85661618c10e42b8a89e820621&sendernum=8583&textmessage=${message}&receivenum=${number};`;
    this._http.get(url).subscribe(res => {
      console.log('Response');
      console.log(res);
    });
    // this._http
    //   .get(url, {}, {})
    //   .then(res => {
    //     console.log('Response');
    //     console.log(res);
    //   })
    //   .catch(error => {
    //     console.log('Error in sending message');
    //     console.error(error);
    //     console.log(error.status);
    //     console.log(error.error); // error message as string
    //     console.log(error.headers);
    //   });
    // console.log('i am here..');
    // const payload = {
    //   from: 'nodejs21@gmail.com',
    //   to: 'saadzahid537@gmail.com',
    //   subject: 'Room Reservaion',
    //   text: 'You room is reserved'
    // };
    // this._room.confirmBooking(payload).then(res => {
    //   console.log('Booked!!');
    //   console.log(res);
    // });
  }

  back(response) {
    console.log('Exiting');
    this._viewCtrl.dismiss(response);
  }
}
