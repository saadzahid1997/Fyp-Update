import { Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UserService } from '../../app/services/user.service';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the SearchPeoplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-people',
  templateUrl: 'search-people.html',
})
export class SearchPeoplePage implements OnInit {
  userList : any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public userSer:UserService, public viewCtrl : ViewController, public modalCtrl : ModalController) {
  }

  ngOnInit()
  {
    this.userSer.getHotels().subscribe(user => {
      this.userList = user;
      console.log(this.userList);
    })
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPeoplePage');
  }
  userProfile(memberId)
  {
    console.log(memberId);
    this.modalCtrl.create('MembersDetailPage',{memberId}).present();
  }
  dismiss()
  {
    this.viewCtrl.dismiss();
  }
}
