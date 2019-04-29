import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TripService } from '../../app/services/trips.service';

/**
 * Generated class for the TripPopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip-pop',
  templateUrl: 'trip-pop.html',
})
export class TripPopPage {
  tripList: any = [];
  hotelId;

  constructor(public navCtrl: NavController, public navParams: NavParams, public tripSer: TripService) {
  }

  ionViewDidLoad() {
    this.tripSer.getTripDetails().subscribe(trips => { this.tripList = trips })
  }

  addHotelToTrip(tripId) {
    this.hotelId = this.navParams.data.hotelId;
    console.log(`hoteldId: ${this.hotelId}  |tripId: ${tripId}`);
    this.tripSer.addHotelToTrip(this.hotelId, tripId).then(res => {
      alert("Hotel has been successfully added to trip!")
    }).catch(error => {
      console.error(error);
      alert("Try again!")
    })

  }

  

}

//   ngOnInit()
//   {


// }
