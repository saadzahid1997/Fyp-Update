import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TripService } from '../../app/services/trips.service';
import { HotelService } from '../../app/services/hotels.service';
import { ResturantService } from '../../app/services/resturant.service';
import {PlacesService} from '../../app/services/places.service';
import { HotelDetailsPage } from '../hotel/hotel-details/hotel-details';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Members } from '../../models/tripMemers/tripMember.interface';
import { UserService } from '../../app/services/user.service';
import { tripMembersService } from '../../app/services/tripMembers.service';
/**
 * Generated class for the TripDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip-details',
  templateUrl: 'trip-details.html',
})
export class TripDetailsPage implements OnInit {
  tripList : any = []
  hotelList: any = []
  hotelId: any= []
  resId: any= [];
  resList: any =[];
  placeId: any= [];
  placeList: any =[];
  tripMemeberRef:any 
  tripMember = {} as Members 
  userId: string;
  resLength:any = [];
  placeLength:any = [];
  hotelLength:any=[];
  userName: string;
  memberList: {
  id: string; data: any; //ionicframework.com/docs/components/#navigation for more info on
  }[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public tripSer : TripService , public hotelSer:HotelService, public resSer:ResturantService, public placeSer:PlacesService , public db:AngularFirestore, public userSer:UserService, public memberSer:tripMembersService) {
  
      this.tripMemeberRef = this.db.collection('trip-Members');

  }
  ngOnInit()
  { 
      (this.navParams.data.tripDetailId);
      this.tripSer.tripDetails(this.navParams.data.tripDetailId).subscribe(item =>{
        console.log(item);
        this.tripList[0] = item.data;
        console.log(this.tripList);
        this.hotelLength = this.tripList[0].hotels.length;
        console.log(this.hotelLength);
       for(let i = 0 ; i < this.hotelLength; i++)
        {
          console.log(this.tripList[0].hotels[i]);

          this.hotelId[i] = this.tripList[0].hotels[i];
        }   
        console.log(this.hotelId);
        
        for(let x = 0; x < this.hotelId.length;x++)
        { 
          this.hotelSer.showHotelDetails(this.hotelId[x]).subscribe(hotel =>{
            console.log(hotel);
            this.hotelList[x] = hotel.data;
          })
        }
        console.log(this.hotelList);  
        
         this.resLength = this.tripList[0].resturants.length;
        console.log(this.resLength);
       for(let i = 0 ; i < this.resLength; i++)
        {
          console.log(this.tripList[0].resturants[i]);

          this.resId[i] = this.tripList[0].resturants[i];
        }   
        console.log(this.hotelId);
        for(let x = 0; x < this.resId.length;x++)
        { 
          this.resSer.showResDetails(this.resId[x]).subscribe(resturant =>{
            //console.log(hotel);
            this.resList[x] = resturant.data;
          })
        }

        this.placeLength = this.tripList[0].places.length;
        console.log(this.placeLength);
       for(let i = 0 ; i < this.placeLength; i++)
        {
          console.log(this.tripList[0].places[i]);

          this.placeId[i] = this.tripList[0].places[i];
        }   
        console.log(this.hotelId);
        for(let x = 0; x < this.placeId.length;x++)
        { 
          this.placeSer.showPlacesDetails(this.placeId[x]).subscribe(place =>{
            //console.log(hotel);
            this.placeList[x] = place.data;
          })
        }

      })

      this.userSer.user$.subscribe(user =>{
        this.userId = user.uid;
        this.userName = user.displayName
     
      })
      this.memberSer.getMembersDetails(this.navParams.data.tripDetailId).subscribe(item =>{
        this.memberList = item;
        console.log(this.memberList);
      })
  }

  addMember()
  {
      this.tripMemeberRef.add({

        memberName: this.tripMember.userName = this.userName,
        memberId: this.tripMember.uId = this.userId,
        tripId: this.tripMember.triplId = this.navParams.data.tripDetailId

      })
  }

  hotelDetail(hotelId){
    hotelId = this.hotelId;
    console.log(hotelId);
    this.navCtrl.setRoot('HotelDetailsPage', {hotelId});
    }

  resturantDetail(resId){
      resId = this.resId;
      this.navCtrl.setRoot('ResturantDetailsPage', {resId});
      }
      
  placeDetail(placeId){
        this.navCtrl.setRoot('PlaceDetailsPage', {placeId});
        }  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TripDetailsPage');
  }

}
