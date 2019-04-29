
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);

  }
ngOnInit()
{
    console.log(this.navParams.data.userName)

}
  goToSearchPage(userName) {
    userName = this.navParams.data.userName
    this.navCtrl.setRoot('SearchPage',{userName});
  }
}

