import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
declare var google: any;
/**
 * Generated class for the ResturantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resturants',
  templateUrl: 'resturants.html',
})
export class ResturantsPage {
  searchResturantForm:FormGroup;
  searchResLat: any;
  searchResLng: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _formBuilder:FormBuilder, 
    public mapsApiLoader:MapsAPILoader) {
    this.searchResturantForm = this._formBuilder.group({
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
          this.searchResLat = place.geometry.location.lat();
          console.log(this.searchResLat);
          this.searchResLng = place.geometry.location.lng();               
          console.log(this.searchResLng);
      });
    });
  }
  addResturants()
  {
    this.navCtrl.setRoot('AadResturantsPage');
  }
  searchResturants(searchResLat,searchResLng)
  {
    searchResLat = this.searchResLat;
    searchResLng = this.searchResLng;
    this.navCtrl.setRoot('FindResturantsPage',{searchResLat,searchResLng})
  }
}
