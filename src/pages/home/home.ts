
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { TripService } from '../../app/services/trips.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {
  publicTripList :any= []; 
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public tripSer : TripService) {
    this.menuCtrl.enable(true);

  }
ngOnInit()
{
    console.log(this.navParams.data.userData)
    this.tripSer.showPublicTrips().subscribe(items => {
      this.publicTripList = items;
    });
 

}
  goToSearchPage(userName) {
    userName = this.navParams.data.userName
    this.navCtrl.setRoot('SearchPage',{userName});
    
  }
  
  tripDetails(tripDetailId)
  {
    console.log(tripDetailId);
    this.navCtrl.setRoot('TripDetailsPage',{tripDetailId});
  }
}

