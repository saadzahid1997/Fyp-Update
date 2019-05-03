import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../app/services/user.service';
import { HotelService } from '../../app/services/hotels.service';

/**
 * Generated class for the UserHotelsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-hotels',
  templateUrl: 'user-hotels.html',
})
export class UserHotelsPage implements OnInit {
  user: any;
  hotelDetails: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public userSer: UserService, public hotelSer: HotelService) {
  }
  ngOnInit() {
    this.userSer.user$.subscribe(async user => {
      this.user = user;
      await this.user.hotelIds.forEach(hotelId => {
        this.hotelSer.getUserHotels(hotelId).subscribe(details => {
          this.hotelDetails.push(details)
        })
      })
      console.log("In the user hotels");
      
      console.log(this.hotelDetails)
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserHotelsPage');
  }
  hotelDetail(hotelId)
  {
    this.navCtrl.setRoot('HotelDetailsPage',{hotelId})
  }
  dismiss() {
    this.navCtrl.setRoot('HomePage');
  }
}
