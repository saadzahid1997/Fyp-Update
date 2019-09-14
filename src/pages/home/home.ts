
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { TripService } from '../../app/services/trips.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../../app/services/user.service';
import { TripLikes } from '../../models/tripLikes/tripLikes.interface';
import { TripLikeService } from '../../app/services/tripLikes.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {
  tripLikes = {} as TripLikes;
  publicTripList :any= []; 
  tripRef$:any;
  tripLikesRef$:any;
  userId:any;
  tripL :any;
  i:any;
  //tripLikes:any = [];
  likeId : any=[];
  likeLength : any;
  userName: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public tripSer : TripService,
    public userSer : UserService,
    public tripLikeSer : TripLikeService,
    public db : AngularFirestore)
  {
    this.menuCtrl.enable(true);
    this.tripRef$ = this.db.collection('trips')
    this.tripLikesRef$ = this.db.collection('trip-Likes')
  }
ngOnInit()
{
    console.log(this.navParams.data.userData)
    this.tripSer.showPublicTrips().subscribe(items => {
      this.publicTripList = items;
    });
    this.userSer.user$.subscribe(user =>{
      this.userId = user.uid;
      this.userName = user.displayName;
    });
    this.tripLikeSer.getTripLikeDetails().subscribe(likes => {
      this.tripL= likes;
      //console.log(this.tripL[0].data.uName);
    });
    
    
 

}
  goToSearchPage(userName) {
    userName = this.navParams.data.userName
    this.navCtrl.setRoot('SearchPage',{userName});
    
  }
  
  tripDetails(tripDetailId)
  {
    console.log(tripDetailId);
    this.navCtrl.setRoot('TripDetailsPage',{tripDetailId});
  }

  tripLike(tripDetailId)
  {
    //  for(this.i = 0; this.i < this.tripL.length; this.i++)
    //  if(this.tripL.data.uid != this.userId)
    //    { 

    //     this.tripLikesRef$.add({
    //       uid: this.tripLikes.uId = this.userId,
    //       uName : this.tripLikes.userName = this.userName,
    //       tripId : this.tripLikes.triplId = tripDetailId,
    //       like:this.tripLikes.like = true
    //     });
    //     console.log('Liked');
    //   }
    // else
    //   {
    //     console.log('Not Liked')
    //   }  
    
  //   this.tripSer.tripDetails(tripDetailId).subscribe(items => {
  //       this.likeId = items;
  //       console.log(this.likeId.data.tripLikes);
  //       //this.likeLength = this.likeId.data.tripLikes.length();
  //       console.log(this.likeLength);
  //     if(this.likeId.data.tripLikes != this.userId)
  //     {
  //       this.likeLength = this.likeLength + 1;
  //       this.db.collection('trip-Likes')
  //     }
  //     else
  //     {
  //       console.log("Already Liked")
  //     }   
  //   });

    
  //   console.log(this.tripRef$);
  //   console.log("Liked");
  //   console.log(tripDetailId);
  // }
}

}