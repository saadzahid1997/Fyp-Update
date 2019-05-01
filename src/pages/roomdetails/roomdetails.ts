import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

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
export class RoomdetailsPage {
  roomDetails: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _viewCtrl: ViewController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomdetailsPage');
    this.roomDetails = this.navParams.data.roomDetails;
    console.log('roomDetails');
    console.log(this.roomDetails);
  }

  back(response) {
    console.log('Exiting');
    this._viewCtrl.dismiss(response);
  }
}
