import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{hotelReviewService}from '../../app/services/hotelReview.service'
import { AngularFirestore } from '@angular/fire/firestore';
import{Review} from '../../models/reviews/reviews.interface';
/**
 * Generated class for the HotelReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hotel-review',
  templateUrl: 'hotel-review.html',
})
export class HotelReviewPage implements OnInit{
  hotelId: any;
reviewList:any = [];
reviewRef:any;
review = {} as Review;
  constructor(public navCtrl: NavController, public navParams: NavParams, public reviewSer:hotelReviewService, public db: AngularFirestore) {
    this.reviewRef = this.db.collection('hotel-Reviews')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelReviewPage');
  }
  ngOnInit()
  {
     this.reviewSer.getReviewDetails().subscribe(review => { this.reviewList = review })
     console.log(this.reviewList);
  }
  // }
}
