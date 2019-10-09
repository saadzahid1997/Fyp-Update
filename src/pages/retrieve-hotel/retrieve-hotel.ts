import { Component, OnInit } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController,
  ModalController
} from 'ionic-angular';
import { HotelService } from '../../app/services/hotels.service';
import { Hotel } from '../../models/hotels/hotels.interface';
import { SearchHotelsPage } from '../../pages/hotel/search-hotels/search-hotels';
//import * as geofirex from 'geofirex';
import { Observable, BehaviorSubject, from } from 'rxjs';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { TripService } from '../../app/services/trips.service';
import { storage } from 'firebase';
import { Trip } from '../../models/trips/trips.interface';
import { ViewController } from 'ionic-angular/navigation/view-controller';
//import { FirebaseApp } from '@firebase/app-types';
/**
 * Generated class for the RetrieveHotelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-retrieve-hotel',
  templateUrl: 'retrieve-hotel.html'
})
export class RetrieveHotelPage implements OnInit {
  hotels: Observable<any>;
  radius = new BehaviorSubject(0.5);
  hotelsList: any = [];
  filterHotelsList:any = [];
  retHotelList: any = [];
  hotel = {} as Hotel;
  i: any;
  x: any;
  hotelLat: any;
  hotelLng: any;
  hotelLatList: any = [];
  hotelLngList: any = [];
  length;
  // tripDetails = [];
  locationRef = SearchHotelsPage.searchPlace;
  searchLocationRef: string;
  hotelRef$: AngularFirestoreCollection<any>;
  btnStatus: any;
  trip = {} as Trip;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFirestore,
    private hotelSer: HotelService,
    public popoverCtrl: PopoverController,
    public tripSer: TripService,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
  ) {
    this.hotelRef$ = this.db.collection('hotel');
  }

  ngOnInit() {
    // this.tripSer.getTripDetails().subscribe(trips => {
    //   console.log(trips);
    // })
    console.log(this.navParams.data.btnStatus);
    this.btnStatus = this.navParams.data.btnStatus;
    console.log('in thre retrieve page');
    console.log(' Latitude');
    console.log(this.navParams.data.searchLocationLat);
    this.hotelLat = this.navParams.data.searchLocationLat;
    console.log(' Longitude');
    this.hotelLng = this.navParams.data.searchLocationLng;
    this.hotelSer.getHotels().subscribe(items => {
      console.log(items);
      this.hotelsList = items;
      this.filterHotelsList = items;
      console.log(this.hotelsList);
      console.log(items.length);
      console.log('Hotel');
      this.length = items.length;
      this.x = 0;
      for (let i = 0; i < this.length; i++) {
        if (
          this.hotelsList[i].data.hotelLocationLat == this.hotelLat &&
          this.hotelsList[i].data.hotelLocationLng == this.hotelLng
        ) {
          console.log('in the for loop');

          this.retHotelList[this.x] = this.hotelsList[i];

          this.x = this.x + 1;
        } else {
          console.log('not executing');
        }
      }
      console.log(this.retHotelList);
      this.hotelsList = this.retHotelList;
      console.log(this.hotelsList.length);
      for (let i = 0; i < this.hotelsList.length; i++) {
        this.hotelLatList = this.hotelsList[i].data.hotelLocationLat;
        this.hotelLngList = this.hotelsList[i].data.hotelLocationLng;
      }

      console.log(this.hotelLatList);
      console.log(this.hotelLngList);

      // for(let x = 0; x < this.length; x++)
      // {

      //   this.hotelLatList[x] = this.hotelsList[x].data.hotelLocationLat;
      //   this.hotelLngList[x] = this.hotelsList[x].data.hotelLocationLng;
      // }
      // console.log(this.hotelLatList);
      // console.log(this.hotelLngList);
    });
  }
  ionViewDidLoad() {}
  /**
   * Open Notification Pop-over
   * @param myEvent
   */

  getHotel(val, getHotels) {
    console.log(val);
    this.hotelSer.showHotelDetails(val).subscribe(item => {
      this.trip.tripHotels = item;
      getHotels = this.trip.tripHotels;
      console.log(getHotels);
      this.hotelSer.setHotelDetails(getHotels);
      //this.navCtrl.setRoot('TripsPage',{getResturant})
      this.viewCtrl.dismiss();
    });
  }
  mapView() {
    this.modalCtrl
      .create('HotelMapPage', {
        Latitude: this.hotelLatList,
        Longitude: this.hotelLngList
      })
      .present();
  }

  hotelDetail(hotelId) {
    this.navCtrl.setRoot('HotelDetailsPage', { hotelId });
  }

  intializeItem():void
  {
    console.log("in the method")
    this.hotelsList = this.filterHotelsList;
    console.log(this.hotelsList);
  
  }
  searchHotel(evt)
  {
    console.log("in the method")
    this.intializeItem();
    const searchHotel = evt.srcElement.value;  
    console.log(searchHotel);
    if(!searchHotel)
    {
      return;
    }

    this.hotelsList = this.hotelsList.filter(currentHotel =>{
      if(currentHotel.data.hotelName && searchHotel)
      {
        if (currentHotel.data.hotelName.toLowerCase().indexOf(searchHotel.toLowerCase()) > -1) {
          return true;
        }
        return false;
       }
    });
  }


  dismiss() {
    this.navCtrl.setRoot('SearchHotelsPage');
  }
}
