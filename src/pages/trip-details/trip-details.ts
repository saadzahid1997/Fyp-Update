import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TripService } from '../../app/services/trips.service';
import { HotelService } from '../../app/services/hotels.service';
import { ResturantService } from '../../app/services/resturant.service';
import {PlacesService} from '../../app/services/places.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Members } from '../../models/tripMemers/tripMember.interface';
import { UserService } from '../../app/services/user.service';
import { tripMembersService } from '../../app/services/tripMembers.service';
import {TripReview} from '../../models/tripReview/tripReview.interface';
import { tripReviewService } from '../../app/services/tripReview.service';
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
  hotelIdLength: any;
  resIdLength: any;
  planIdLength: any;
  planList: any;
  dayPlanList: any = [];
  userRef: any;
  reviewRef$: any;
  review = {} as TripReview
  reviewList:any = [];
  tripReviewList: any = [];
  x: number;
  hotelLocationList:any=[];
  placeLocationList:any=[];
  resturantLocationList:any=[];
  photo: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public tripSer : TripService , public hotelSer:HotelService,
     public resSer:ResturantService, public placeSer:PlacesService ,
      public db:AngularFirestore, public userSer:UserService,
       public memberSer:tripMembersService, public reviewSer:tripReviewService,
       public modalCtrl:ModalController) {
  
      this.tripMemeberRef = this.db.collection('trip-Members');
      this.reviewRef$ = this.db.collection('trip-Review')

  }
  ngOnInit()
  { 
      console.log(this.navParams.data.tripDetailId);
      this.tripSer.tripDetails(this.navParams.data.tripDetailId).subscribe(item =>{
        console.log(item);
        this.tripList[0] = item.data;
        console.log(this.tripList);
        this.dayPlanList = this.tripList[0].tripDayDescription;

        this.hotelLength = this.tripList[0].tripHotels.length;
        console.log(this.hotelLength)
        for(let i = 0 ; i < this.hotelLength; i++)
        {
          this.hotelId[i] = this.tripList[0].tripHotels[i];
          this.hotelSer.showHotelDetails(this.hotelId[i]).subscribe(hotel =>{
            this.hotelList[i] = hotel.data;
            this.hotelLocationList = this.hotelList[i].hotelLocation;
            
          })
          console.log(this.hotelLocationList);
        }

        this.resLength = this.tripList[0].tripResturants.length;
        console.log(this.resLength);
        for(let i = 0 ; i < this.resLength; i++)
        {
          this.resId[i] = this.tripList[0].tripResturants[i];
          console.log(this.resId[i]);
          this.resSer.showResDetails(this.resId[i]).subscribe(resturant =>{
            this.resList[i] = resturant.data;
            console.log(this.resList);
            this.resturantLocationList = this.resList[i].resturantLocation;
            
          })
          console.log(this.resturantLocationList);
        } 

        this.placeLength = this.tripList[0].tripPlaces.length;
        for(let i = 0 ; i < this.placeLength; i++)
        {
          this.placeId[i] = this.tripList[0].tripPlaces[i];
          this.placeSer.showPlacesDetails(this.placeId[i]).subscribe(place =>{
            this.placeList[i] = place;
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
        
        this.reviewSer.getReviewDetails().subscribe(items => {
          this.reviewList = items;
          this.x = 0;
          for (let i = 0; i < items.length; i++) {
            if (this.reviewList[i].data.tripId == this.navParams.data.tripDetailId) {
              this.tripReviewList[this.x] = this.reviewList[i];
              this.x = this.x + 1;
            }
            else {
              console.log("no reviews")
            }
          }
          console.log(this.tripReviewList);
          this.reviewList = this.tripReviewList;
    
        });
  }
  addMember()
  {
    console.log('in the add memner')
    this.userSer.user$.subscribe(user =>{
      this.userId = user.uid;
      this.userName = user.displayName
      this.photo = user.fileURL  
      this.tripMemeberRef.add({

        memberName: this.tripMember.userName = this.userName,
        memberId: this.tripMember.uId = this.userId,
        tripId: this.tripMember.triplId = this.navParams.data.tripDetailId,
        memberPhoto:this.photo
      })

    })
    console.log('Done')   
  }
  memberProfile(memberId)
  {
    this.navCtrl.setRoot('ProfilePage',{memberId});
  }
addReview()
{
  console.log("Clicked Done")
  this.userRef = this.userSer.user$.subscribe(user => {
    this.userRef = user.displayName
    console.log(this.userRef)
    this.reviewRef$.add({
      userName: this.review.userName = this.userRef,
      tripId: this.review.tripId = this.navParams.data.tripDetailId,
      tripReview: this.review.tripReview
    })
  })
}

  hotelDetail(hotelId){
    
    console.log(hotelId);
    this.navCtrl.setRoot('HotelDetailsPage', {hotelId});
    }

  resturantDetail(resId){
      
      this.navCtrl.setRoot('ResturantDetailsPage', {resId});
      }
      
  placeDetail(placeId)
        {
        this.navCtrl.setRoot('PlaceDetailPage', {placeId});
        }  

  openLocationMap()
    {
      this.modalCtrl.create('TripMapPage', { }).present();
    }      
  ionViewDidLoad() {
    console.log('ionViewDidLoad TripDetailsPage');
  }
  dismiss()
  {
    this.navCtrl.setRoot('CreateTripPage');
  }
}
