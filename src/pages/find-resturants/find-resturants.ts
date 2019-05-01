import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController,Platform } from 'ionic-angular';
import { ResturantService } from '../../app/services/resturant.service';
import {Trip} from '../../models/trips/trips.interface';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the FindResturantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-resturants',
  templateUrl: 'find-resturants.html',
})
export class FindResturantsPage implements OnInit {
  resturantList: any = [];
  map: any;
  geocoder: any;
  address: any;
  google:any;
  resLat: any;
  resLng: any;
  retResList: any = [];
  x: number;
  btnStatus: any;
  trip = {} as Trip;
  y : number;

  constructor(public navCtrl: NavController, 
               public navParams: NavParams,
               public resturantSer : ResturantService,
               public db : AngularFirestore,
               public popoverCtrl: PopoverController,
               public platform: Platform,
               public viewCtrl: ViewController)
   {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindResturantsPage');
  }
  ngOnInit()
  {   console.log(this.btnStatus);
      this.btnStatus = this.navParams.data.btnStatus;
      this.resLat = this.navParams.data.searchResLat;
      this.resLng = this.navParams.data.searchResLng;
      this.resturantSer.getResturant().subscribe(resturant=>{
      console.log(resturant);
      this.resturantList = resturant;
      this.x = 0;  
      //console.log(this.resturantList[2].data.resturantLocationLat);
      for(let i = 0; i< resturant.length ; i++ )
      {
        if(this.resturantList[i].data.resturantLocationLat == this.resLat && this.resturantList[i].data.resturantLocationLng == this.resLng )
        {
          console.log("in the for loop")

          this.retResList[this.x] = this.resturantList[i];
          
          this.x = this.x + 1;  
        }
        
        else
        {
          console.log("not executing")
        }
      }
      //console.log(this.retHotelList);
      this.resturantList = this.retResList

    });
  }
  getResturant(val,getResturant)
  {
    console.log(val);
    this.resturantSer.showResDetails(val).subscribe(item =>{
      this.trip.tripResturants = item
      getResturant = this.trip.tripResturants
      console.log(getResturant);
      this.resturantSer.setResDetails(getResturant);
      //this.navCtrl.setRoot('TripsPage',{getResturant})
      this.viewCtrl.dismiss();  
    })
    
  }
  openTrips(myEvent, resturantId) {
    console.log(resturantId);
    let popover = this.popoverCtrl.create('TripPopResturantsPage', { resturantId });
    popover.present({
      ev: myEvent
    });
  }
  resDetail(resId)
  {
    this.navCtrl.setRoot('ResturantDetailsPage',{resId});
  }
}
