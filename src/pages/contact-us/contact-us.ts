
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var google;

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  // Contact Information
  contactInfos = {
    email: 'saadzahid537@gmail.com',
    phone: '000 000 000',
    whatsapp: '000 000 000',
    address: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngAfterViewInit() {
    this.loadmap();
  }

  loadmap() {

  
    const latlng = new google.maps.LatLng(49.2882266, -123.1180008);

  
    const mapStyle = [
      {
        featureType: "all",
        stylers: [
          { hue: "#0000ff" },
          { saturation: -75 }
        ]
      },
      {
        featureType: "poi",
        elementType: "label",
        stylers: [
          { visibility: "off" }
        ]
      }
    ];

    // Map Options
    let mapOptions = {
      center: latlng,
      zoom: 15,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
      },
      navigationControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: mapStyle
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  
    this.map.setCenter(latlng);

  
    this.addMarker();
  }

  addMarker() {

  
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    // Content of Marker
    let content = "<h4>Hello!</h4>";

    // Call Marker Info Window
    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
}
