import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
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
export class PalcesPage {

  searchPlaceForm:FormGroup;
  searchPlaceLat: any;
  searchPlaceLng: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _formBuilder:FormBuilder, 
    public mapsApiLoader:MapsAPILoader) {
    this.searchPlaceForm = this._formBuilder.group({
      txtSearch: ['', Validators.required]
  })
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
  
}
