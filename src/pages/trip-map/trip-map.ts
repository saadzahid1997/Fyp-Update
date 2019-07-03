import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
declare var google:any;
/**
 * Generated class for the TripMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip-map',
  templateUrl: 'trip-map.html',
})
export class TripMapPage {

  map: any;
  geocoder: any;
  address: any;
  google:any;
  HotelLatitude: any;
  HotelLongitude: any;
  ResturantLatitude: any;
  ResturantLongitude: any;
  PlaceLatitude: any;
  PlaceLongitude: any;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform) {
    // Get Hotel Address
    this.HotelLatitude = this.navParams.get('HotelLatitude');
    this.HotelLongitude = this.navParams.get('HotelLongitude');
    this.ResturantLatitude = this.navParams.get('ResturantLatitude');
    this.ResturantLongitude = this.navParams.get('ResturantLongitude');
    this.PlaceLatitude = this.navParams.get('PlaceLatitude');
    this.PlaceLongitude = this.navParams.get('PlaceLongitude');
    
    this.address = this.navParams.get('Address');
    console.log(this.HotelLatitude);
    console.log(this.HotelLongitude);
    console.log(this.ResturantLatitude);
    console.log(this.ResturantLongitude);
    console.log(this.PlaceLatitude);
    console.log(this.PlaceLongitude);
  }

  /**
   * Lifecycle hook that is called after a component's view has been fully initialized.
   */
  ngOnInit() {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  /**
   * --------------------------------------------------------------
   * Load Google Map
   * --------------------------------------------------------------
   */
  loadMap() {

    this.geocoder = new google.maps.Geocoder();

    // Convert Hotel Address into Geographic Coordinates(Latitude and Longitude)
    // this.geocoder.geocode({
    //   //'address': this.address
       
    // }, function (results, status) 
      // if (status == google.maps.GeocoderStatus.OK) {
         console.log("In the function") 
      //   // Hotel Latitude
        //const latitude = results[0].geometry.location.lat();

        // Hotel Longitude
        //const longitude = results[0].geometry.location.lng();

        // Set Latitude and Longitude
        let latlng = new google.maps.LatLng(this.HotelLatitude, this.HotelLongitude );

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
          content: this.address
        });

        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open(this.map, marker);
        });
      
    
    console.log("Done");
  }
}
