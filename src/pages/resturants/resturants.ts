import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { ResturantService } from '../../app/services/resturant.service';

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
export class ResturantsPage implements OnInit {
  searchResturantForm:FormGroup;
  searchResLat: any;
  searchResLng: any;
  tripName: any;
  resturantList:any=[];
  btnStatus:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _formBuilder:FormBuilder, 
    public mapsApiLoader:MapsAPILoader, public resSer:ResturantService) {
    this.searchResturantForm = this._formBuilder.group({
      txtSearch: ['', Validators.required]
      
  })
  this.btnStatus = false;
}

  ngOnInit() {
    this.tripName = this.navParams.data.tripName;
    console.log(this.tripName);
    if(this.tripName !== null && this.tripName !== undefined && this.tripName !== "" )
    {
      this.btnStatus = true;
      console.log(this.btnStatus);
      
    }
    this.resSer.getResturant().subscribe(resturant =>{
      this.resturantList = resturant;
      console.log(this.resturantList)
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
  searchResturants(searchResLat,searchResLng, btnStatus)
  {
    console.log(this.btnStatus);
    btnStatus = this.btnStatus;
    searchResLat = this.searchResLat;
    searchResLng = this.searchResLng;
    this.navCtrl.setRoot('FindResturantsPage',{searchResLat,searchResLng,btnStatus})
  }

  resDetail(resId)
  {
    this.navCtrl.setRoot('ResturantDetailsPage',{resId});
  } 
  dismiss()
  {
    this.navCtrl.setRoot('HomePage')
  }
}
