/**
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 *
 * This File Represent Profile Page Component
 * File path - '../../src/pages/profile/profile'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../app/services/user.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  user;
  // Segment Options
  options: any = 'User Info';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _user: UserService
  ) {
    this._user.user$.subscribe(user => {
      this.user = user;
    });
  }
}
