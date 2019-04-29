import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
declare var google :any;
/**
 * Generated class for the HotelMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hotel-map',
  templateUrl: 'hotel-map.html',
})
export class HotelMapPage implements OnInit {
  google:any;
  //geocoder: google.maps.Geocoder;
  geocoder:any;
  Latitude : any;
  Longitude:any;
  map:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform : Platform) {
    
  this.Latitude = this.navParams.get('Latitude');
  this.Longitude = this.navParams.get('Longitude');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelMapPage');
  }

  ngOnInit()
  {
    this.platform.ready().then(() => {
      this.loadMap();
    });

  }

  loadMap() {

    this.geocoder = new google.maps.Geocoder();

         console.log("In the function") 
        let latlng = new google.maps.LatLng(this.Latitude, this.Longitude );

        // Map Options
        const mapOptions = {
          zoom: 17,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        // Set Map in Center
        this.map.setCenter(latlng);
        
        // Create Marker
        
            const marker = new google.maps.Marker({
              map: this.map,
              position: latlng
            });
          
            // Marker Infor Window
            const infoWindow = new google.maps.InfoWindow({
              //content: this.address
            });

            google.maps.event.addListener(marker, 'click', function () {
              infoWindow.open(this.map, marker);
            });
        
    
    console.log("Done");
  }

}
