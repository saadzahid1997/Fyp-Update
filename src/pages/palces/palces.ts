import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { PlacesService } from '../../app/services/places.service';
import {Trip} from '../../models/trips/trips.interface'
declare var google: any;

/**
 * Generated class for the PalcesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-palces',
  templateUrl: 'palces.html',
})
export class PalcesPage implements OnInit {

  searchPlaceForm:FormGroup;
  searchPlaceLat: any;
  searchPlaceLng: any;
  tripName: any;
  btnStatus: boolean;
  trip = {} as Trip

  constructor(public navCtrl: NavController, public navParams: NavParams, public _formBuilder:FormBuilder, 
    public mapsApiLoader:MapsAPILoader , public placeSer:PlacesService, public viewCtrl:ViewController) {
    this.searchPlaceForm = this._formBuilder.group({
      txtSearch: ['', Validators.required]
  })
}

  ngOnInit()
  {
    this.tripName = this.navParams.data.tripName;
    console.log(this.tripName);
    if(this.tripName !== null && this.tripName !== undefined && this.tripName !== "" )
    {
      this.btnStatus = true;
      console.log(this.btnStatus);
      
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResturantsPage');
    this.mapsApiLoader.load().then(() => {
      let nativeHomeInputBox = document.getElementById('txtSearch').getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox,{
        types : ["geocode"]
      });
      autocomplete.setComponentRestrictions({ 'country': ['pk'] })
      autocomplete.addListener("place_changed", () => {
          let place =  google.maps.places.PlaceResult = autocomplete.getPlace();
          //console.log(place);
          this.searchPlaceLat = place.geometry.location.lat();
          console.log(this.searchPlaceLat);
          this.searchPlaceLng = place.geometry.location.lng();               
          console.log(this.searchPlaceLng);
      });
    });
  }
  addPlaces()
  {
    this.navCtrl.setRoot('AddPlacesPage');
  }

  

  searchPlaces(  searchPlaceLat,searchPlaceLng) {
    searchPlaceLat = this.searchPlaceLat;
    searchPlaceLng = this.searchPlaceLng;
    this.navCtrl.setRoot('FindPlacesPage',  {searchPlaceLat,searchPlaceLng })
  }
  dismiss(){
    this.navCtrl.setRoot('HomePage');
  }
  
}
