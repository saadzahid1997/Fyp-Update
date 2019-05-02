
import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Search } from '../../../models/search';
import { CalendarModal, CalendarModalOptions } from 'ion2-calendar';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//import {Geolocation} from '@ionic-native/geolocation';
//import { google, GoogleMap } from '@agm/core/services/google-maps-types';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { MapsAPILoader } from '@agm/core';
import { HotelService } from '../../../app/services/hotels.service';
import {Trip} from '../../../models/trips/trips.interface'
//import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
//import { Hotel } from '../../../models/hotels/hotels.interface';
//import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
//import { google} from '@google/maps';
declare var google: any;



@IonicPage()
@Component({
  selector: 'page-search-hotels',
  templateUrl: 'search-hotels.html',
})
export class SearchHotelsPage implements OnInit {
  google:any;
  searcHotelForm: FormGroup;
  public static  searchPlace:string;
  locationRef:string;
  searchLocationRef:any;
  hotelsList: any =[];
  markers: any[]; 
  //hotelRef$: AngularFirestoreCollection<Hotel[]>
  @ViewChild("addHotels")
  @ViewChild("search")
  public searchElementRef: any;
  trip = {} as Trip;
  searchObjects: Search = new Search();
  searchLocationLat: number;
  searchLocationLng: number;
  tripName: any;
  btnStatus: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public _formBuilder: FormBuilder,
    public geoLocation: Geolocation,
    public MapsApiLoader : MapsAPILoader,
    public hotelSer:HotelService,
    public viewCtrl:ViewController
    
    //private database: AngularFirestore
    ) {
      
     this.searcHotelForm = this._formBuilder.group({
     txtSearch: ['', Validators.required]  

    })
    
  }

  ngOnInit(){
    this.btnStatus = this.navParams.data.btnStatus;
    this.tripName = this.navParams.data.tripName;
    console.log(this.tripName);
    if(this.tripName !== null && this.tripName !== undefined && this.tripName !== "" )
    {
      this.btnStatus = true;
      console.log(this.btnStatus);
      
    }
    this.hotelSer.getHotels().subscribe(hotel=>{
      this.hotelsList = hotel
    })
  }

  openCalendar() {


    const options: CalendarModalOptions = {
      pickMode: 'range',
      color: 'primary'
    };


    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();


    myCalendar.onDidDismiss((date: any) => {
      
      if (date) {

        this.searchObjects.departureDate = date.from.string;

        this.searchObjects.returnDate = date.to.string;
      }
    })
  }

  nearByHotels()
  {
    let nearbyHotels =  this.modalCtrl.create('NearbyHotelsPage');
    nearbyHotels.present();
  }
  ionViewDidLoad() {
  
    console.log("hyyyyyyyyyyyy");
    this.MapsApiLoader.load().then(() => {
      let nativeHomeInputBox = document.getElementById('txtSearch').getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox,{
        types : ["geocode"]
      });
      autocomplete.setComponentRestrictions({ 'country': ['pk'] })
      autocomplete.addListener("place_changed", () => {
          let place = google.maps.places.PlaceResult = autocomplete.getPlace();
         // console.log(place);
          this.searchLocationLat = place.geometry.location.lat();
          this.searchLocationLng = place.geometry.location.lng();
          //console.log(this.searchLocationRef);
      });
    });
  }
  
  findHotels() {
  
    const modal = this.modalCtrl.create('HotelListPage');
    modal.present();
    
      console.log(SearchHotelsPage.searchPlace);
      console.log(this.locationRef);
        
    
  }
  hotelDetail(hotelId)
  {
    this.navCtrl.setRoot('HotelDetailsPage', {hotelId});
  }
  
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
  addHotels() {
    this.navCtrl.setRoot("AddHotelsPage");
  }
  searchHotels(searchLocationLat,searchLocationLng,btnStatus)
  {
    btnStatus = this.btnStatus
    searchLocationLat = this.searchLocationLat;
    searchLocationLng = this.searchLocationLng
    console.log("in the search method")
    console.log(searchLocationLat);
    console.log(searchLocationLat);
    this.navCtrl.setRoot("RetrieveHotelPage",{searchLocationLat,searchLocationLng,btnStatus});
  }
  
}







