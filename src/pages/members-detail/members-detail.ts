import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../app/services/user.service';
import { ViewController } from 'ionic-angular/navigation/view-controller';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public userSer:UserService, public viewCtrl:ViewController) {
  }
ngOnInit()
{ 
  this.memberId = this.navParams.data.memberId;
  this.userSer.getTripMembers(this.memberId).subscribe(user=>{
    this.membersList[0] = user;
    console.log(this.membersList);
  })
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad MembersDetailPage');
  }
dismiss(){
  this.viewCtrl.dismiss()
}
}
