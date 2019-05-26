import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ResturantService } from '../../app/services/resturant.service';
import { Resturant } from '../../models/resturants/resturants.interface';
import { hotelReviewService } from '../../app/services/hotelReview.service';
import { UserService } from '../../app/services/user.service';
import { ResturantReview } from '../../models/resturantReview/resturantReview.interface';
import { resturantReviewService } from '../../app/services/resReview.service';
import { AngularFirestore } from '@angular/fire/firestore';


/**
 * Generated class for the ResturantDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resturant-details',
  templateUrl: 'resturant-details.html',
})
export class ResturantDetailsPage implements OnInit {
  resturantList: any = [];
  resturant = {} as Resturant
  reviewList: any = [];
  x: number;
  resturantId: any;
  resturantReviewList:any = [];
  userRef:any=[];
  reviewRef$:any=[];
  reviews = {} as ResturantReview
  userPhoto: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public resSer:ResturantService,
  public  modalCtrl:ModalController, public reviewSer:resturantReviewService, public userSer:UserService, public afs:AngularFirestore) {
    this.reviewRef$ = this.afs.collection('resturant-Review');
  }

  ngOnInit()
  {
    this.resturantId = this.navParams.data.resId;
    this.resSer.showResDetails(this.resturantId).subscribe(resturants => {
      this.resturantList[0] = resturants;
      console.log(this.resturantList);
    });


    this.reviewSer.getReviewDetails().subscribe(items =>{
      this.reviewList = items;
      this.x = 0;
      for(let i=0 ; i<items.length ; i++)
      {
        if(this.reviewList[i].data.resturantId == this.resturantId)
        {
            this.resturantReviewList[this.x] = this.reviewList[i];
            this.x = this.x + 1;
        }
        else
        {
          console.log("no reviews")
        }
    }
    console.log(this.resturantReviewList);
    this.reviewList = this.resturantReviewList;
      
  });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResturantDetailsPage');
  }
  openLocationMap()
  {
    console.log(this.resturantList[0].data.resturantLocationLat,this.resturantList[0].data.resturantLocationLng )
    this.modalCtrl.create('LocationMapPage', { Latitude: this.resturantList[0].data.resturantLocationLat, Longitude: this.resturantList[0].data.resturantLocationLng, Address:this.resturantList[0].resturantLocation}).present();
  }

  addReview()
  {
       
    this.userRef = this.userSer.user$.subscribe(user=>
      {
        this.userRef = user.displayName,
        this.userPhoto = user.fileURL
      console.log(this.userRef);
      this.reviewRef$.add({
        userName:this.reviews.userName = this.userRef,
        resturantId: this.reviews.resturantId = this.resturantId,
        resturantReview : this.reviews.resturantReview,
        userPhoto : this.userPhoto
      })
         
  })
  }

  dismiss()
  {
    this.navCtrl.setRoot('ResturantsPage');
  }
}
