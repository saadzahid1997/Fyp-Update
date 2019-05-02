import { Component, ViewChild, OnInit } from '@angular/core';
import { Slides, NavController } from 'ionic-angular';
import { HotelService } from '../../app/services/hotels.service';
import { ResturantService } from '../../app/services/resturant.service';
import { PlacesService } from '../../app/services/places.service';
//import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'recommend-destination',
  templateUrl: 'recommend-destination.html'
})
export class RecommendDestinationComponent implements OnInit {

  @ViewChild('slider') slider: Slides;

  hotelList :any = [];
  resList: any = [];
  placeList:any = [];
  recomendationList:any = [];
  // List of Recommend Destination
  constructor(public hotelSer:HotelService, public resSer:ResturantService , public placeSer:PlacesService, public navCtrl:NavController)
  {

  }
  ngOnInit()
  {
    this.hotelSer.getHotels().subscribe(hotel =>{
      this.hotelList = hotel
      console.log(this.hotelList);
    })

    this.resSer.getResturant().subscribe(res =>{
      this.resList = res
      console.log(this.resList);
    })

    this.placeSer.getPlaces().subscribe(place =>{
      this.placeList = place
      console.log(this.placeList);
    })
  }

  getHotel(hotelId)
  {
    this.navCtrl.setRoot('HotelDetailsPage', {hotelId});
  }
  getResturant(resId)
  {
    this.navCtrl.setRoot('ResturantDetailsPage',{resId});
  }
  getPlace(placeId)
  {
    console.log(placeId);
    this.navCtrl.setRoot('PlaceDetailPage',{placeId});
  }
}
