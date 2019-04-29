import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TripService } from '../../app/services/trips.service';

/**
 * Generated class for the TripPopResturantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip-pop-resturants',
  templateUrl: 'trip-pop-resturants.html',
})
export class TripPopResturantsPage {
  tripList: any = [];
  resturantId:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public tripSer:TripService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripPopResturantsPage');
    this.tripSer.getTripDetails().subscribe(trips =>{this.tripList = trips
      console.log(this.tripList);
    } )
    
  }
  addResturantToTrip(tripId)
  {
    this.resturantId = this.navParams.data.resturantId;
    console.log(`resturantdId: ${this.resturantId}  |tripId: ${tripId}`);
    this.tripSer.addResturantToTrip(this.resturantId, tripId).then(res =>{
      alert("Resturant has been successfull added to trips!")
    }).catch(error =>{
      alert("Try Again");
    })
  }

}
