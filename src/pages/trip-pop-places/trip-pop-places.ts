import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TripService } from '../../app/services/trips.service';
/**
 * Generated class for the TripPopPlacesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip-pop-places',
  templateUrl: 'trip-pop-places.html',
})
export class TripPopPlacesPage {

  tripList: any = [];
  placeId:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public tripSer:TripService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripPopResturantsPage');
    this.tripSer.getTripDetails().subscribe(trips =>{this.tripList = trips} )
  }
  addPlaceToTrip(tripId)
  {
    this.placeId = this.navParams.data.placeId;
    //console.log(`resturantdId: ${this.resturantId}  |tripId: ${tripId}`);
    this.tripSer.addPlaceToTrip(this.placeId, tripId).then(res =>{
      alert("Resturant has been successfull added to trips!")
    }).catch(error =>{
      alert("Try Again");
    })
  }

}
