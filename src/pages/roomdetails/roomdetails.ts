import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

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
    private emailComposer: EmailComposer
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomdetailsPage');
    this.roomDetails = this.navParams.data.roomDetails
      ? this.navParams.data.roomDetails[0]
      : '';
    console.log('roomDetails');
    console.log();
  }

  sendEmail() {
    console.log('i am here..');
    let email = {
      to: 'nodejs21@gmail.com',
      // cc: 'erika@mustermann.de',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      // attachments: [],
      subject: 'Room reservation',
      body: 'Following are your room details.'
      // isHtml: true
    };
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        // Now we know we can send
        // Send a text message using default options
        this.emailComposer.open(email);
      }
    });
  }

  back(response) {
    console.log('Exiting');
    this._viewCtrl.dismiss(response);
  }
}
