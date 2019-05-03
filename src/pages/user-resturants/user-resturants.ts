import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../app/services/user.service';
import { ResturantService } from '../../app/services/resturant.service';

/**
 * Generated class for the UserResturantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-resturants',
  templateUrl: 'user-resturants.html',
})
export class UserResturantsPage implements OnInit{
  user:any;
  resturantDetails:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public userSer:UserService, public resSer:ResturantService) {
  }
  ngOnInit()
  {
    this.userSer.user$.subscribe(async user => {
      this.user = user;
      await this.user.restaurantIds.forEach(restaurantId => {
        this.resSer.getUserResturants(restaurantId).subscribe(details => {
          this.resturantDetails.push(details)
        })
      })
      console.log("In the user hotels");
      
      console.log(this.resturantDetails)
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserResturantsPage');
  }
  resturantDetail(resId)
  {
    this.navCtrl.setRoot('ResturantDetailsPage',{resId});
  }
  dismiss()
  {
    this.navCtrl.setRoot('HomePage');
  }
}
