import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UserService } from '../../app/services/user.service';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { HotelService } from '../../app/services/hotels.service';
import { PlacesService } from '../../app/services/places.service';
import { ResturantService } from '../../app/services/resturant.service';

/**
 * Generated class for the MembersDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-members-detail',
  templateUrl: 'members-detail.html',
})
export class MembersDetailPage implements OnInit {
  memberId: any;
  membersList : any = [];
  userHotel;
  userResturant: { id: string; data: any; }[];
  userPlace: { id: string; data: any; }[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public userSer:UserService, public viewCtrl:ViewController, public hotelSer:HotelService, public placeSer:PlacesService, public resturantSer:ResturantService, public modalCtrl:ModalController) {
  }
ngOnInit()
{ 
  this.memberId = this.navParams.data.memberId;
  this.userSer.getTripMembers(this.memberId).subscribe(user=>{
    this.membersList[0] = user;
    console.log(this.membersList);
  })
  
  this.hotelSer.userHotels(this.memberId).subscribe(hotel =>{
    this.userHotel = hotel;
    console.log(this.userHotel);
  })

  this.resturantSer.userResturants(this.memberId).subscribe(resturant =>{
    this.userResturant = resturant;
    console.log(this.userHotel);
  })

  this.placeSer.userPlaces(this.memberId).subscribe(place =>{
    this.userPlace = place;
    console.log(this.userHotel);
  })


}
  ionViewDidLoad() {
    console.log('ionViewDidLoad MembersDetailPage');
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
  message(userId)
  {
    this.modalCtrl.create('MessagePage',{userId}).present(); 
  }
  dismiss()
  {
    this.viewCtrl.dismiss()
  }
}
