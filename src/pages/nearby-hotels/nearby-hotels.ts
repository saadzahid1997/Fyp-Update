import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
//import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Geolocation} from '@ionic-native/geolocation';
//import { google } from '@agm/core/services/google-maps-types';
declare var google:any;
/**
 * Generated class for the NearbyHotelsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nearby-hotels',
  templateUrl: 'nearby-hotels.html',
})
export class NearbyHotelsPage implements OnInit {
  geocoder: any;
  map: any;
  markers: any;
  mapInitialised: boolean;
  mapElement: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform : Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NearbyHotelsPage');
  }
  ngOnInit()
  
    : Promise<any> {

      this.mapInitialised = true;
  
      return new Promise((resolve) => {
  
        Geolocation.getCurrentPosition().then((position) => {
  
          // UNCOMMENT FOR NORMAL USE
          //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  
          let latLng = new google.maps.LatLng(40.713744, -74.009056);
  
          let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }
  
          this.map = new google.maps.Map(this.mapElement, mapOptions);
          resolve(true);
  
        });
  
      });
  
    
  
    // this.platform.ready().then(()=>{
    //   this.loadMap();
    // })
  }
  loadMap()
  {
    console.log("In the loadMap")
    //this.geocoder = new google.maps.Geocoder();
    Geolocation.getCurrentPosition().then((res)=>{
      let pos = {
        lat: res.coords.latitude,
        lng: res.coords.longitude
      };
      console.log("Done")
      this.map = new google.maps.Map(document.getElementById('map'));
      let marker = new google.maps.Marker({
        position : pos,
        map: this.map,
        title: 'My Current Location'  
      });
      this.markers.push(marker);  
      this.map.setCenter(pos);
    }).catch((error)=>{
      console.log('Error getting Location', error); 
    });
  }
}
