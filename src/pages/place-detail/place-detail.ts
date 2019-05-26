import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { ResturantService } from '../../app/services/resturant.service';

import { UserService } from '../../app/services/user.service';
import { Place } from '../../models/places/places.interface';
import { PlacesService } from '../../app/services/places.service';
import { AngularFirestore } from '@angular/fire/firestore';
import {PlaceReview} from '../../models/placeReview/placeReview.interface';
import { placeReviewService } from '../../app/services/placeReview.service';
import {Trip} from '../../models/trips/trips.interface'
/**
 * Generated class for the ResturantDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resturant-details',
  templateUrl: 'place-detail.html',
})
export class PlaceDetailPage implements OnInit {
  placeList: any = [];
  place = {} as Place
  reviewList: any = [];
  x: number;
  placeId: any;
  placeReviewList:any = [];
  userRef:any=[];
  placeRef$:any=[];
  reviews = {} as PlaceReview
  btnStatus:any;
  trip = {} as Trip;
  userPhoto: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public placeSer:PlacesService,
  public  modalCtrl:ModalController, public reviewSer:placeReviewService, public userSer:UserService, public afs:AngularFirestore, public viewCtrl:ViewController) {
    this.placeRef$ = this.afs.collection('place-Review');
  }

  ngOnInit()
  {
    this.btnStatus = this.navParams.data.btnStatus;
    this.placeId = this.navParams.data.placeId;
    this.placeSer.showPlacesDetails(this.placeId).subscribe(places => {
      this.placeList[0] = places;
      console.log(this.placeList);
    });
    

    this.reviewSer.getReviewDetails().subscribe(items =>{
      this.reviewList = items;
      this.x = 0;
      for(let i=0 ; i<items.length ; i++)
      {
        if(this.reviewList[i].data.placeId == this.placeId)
        {
            this.placeReviewList[this.x] = this.reviewList[i];
            this.x = this.x + 1;
        }
        else
        {
          console.log("no reviews")
        }
    }
    console.log(this.placeReviewList);
    this.reviewList = this.placeReviewList;
      
  });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResturantDetailsPage');
  }
  getPlace(val,getPlace)
  {
    console.log(val);
    this.placeSer.showPlacesDetails(val).subscribe(item =>{
      this.trip.tripPlaces = item
      getPlace = this.trip.tripPlaces
      console.log(getPlace);
      this.placeSer.setPlaceDetails(getPlace);
      //this.navCtrl.setRoot('TripsPage',{getResturant})
      this.viewCtrl.dismiss();  
    })
    
  }

  openLocationMap()
  {
    
    this.modalCtrl.create('LocationMapPage', { Latitude: this.placeList[0].data.placeLocationLat, Longitude: this.placeList[0].data.placeLocationLng, Address:this.placeList[0].placeLocation}).present();
  }

  addReview()
  {
       
    this.userRef = this.userSer.user$.subscribe(user=>
      {
        this.userRef = user.displayName,
        this.userPhoto = user.fileURL
    
      console.log(this.userRef);
      this.placeRef$.add({
        userName:this.reviews.userName = this.userRef,
        placeId: this.reviews.placeId = this.placeId,
        placeReview : this.reviews.placeReview,
        userPhoto : this.userPhoto
      })
         
  })
}
dismiss()
{
  this.navCtrl.setRoot('PalcesPage');
}
}
