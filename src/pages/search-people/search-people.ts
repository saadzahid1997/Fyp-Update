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
  filterUserList : any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public userSer:UserService, public viewCtrl : ViewController, public modalCtrl : ModalController) {
  }

  ngOnInit()
  {
    this.userSer.getHotels().subscribe(user => {
      this.userList = user;
      this.filterUserList = user;
      console.log(this.userList);
    })
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPeoplePage');
  }
  userChat(snederId)
  {
    console.log(snederId);
    this.modalCtrl.create('ChatBoxPage',{snederId}).present();
  }

  intializeItem():void
  {
    console.log("in the method")
    this.userList = this.filterUserList;
    console.log(this.userList);
  }

  searchUser(evt)
  {
    console.log("in the method")
    this.intializeItem();
    const searchUser = evt.srcElement.value;  
    console.log(searchUser);
    if(!searchUser)
    {
      return;
    }

    this.userList = this.userList.filter(currentUser =>{
      if(currentUser.data.displayName && searchUser)
      {
        if (currentUser.data.displayName.toLowerCase().indexOf(searchUser.toLowerCase()) > -1) {
          return true;
        }
        return false;
       }
    });
  }

  dismiss()
  {
    this.viewCtrl.dismiss();
  }
}
