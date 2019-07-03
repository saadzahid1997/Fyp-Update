/**
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This File Represent Header Toolbar Component
 * File path - '../../src/components/header-one/header-one'
 */

import { Component, Input } from '@angular/core';
import { NavController, ViewController, ModalController   } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';

@Component({
  selector: 'header-one',
  templateUrl: 'header-one.html'
})
export class HeaderOneComponent {

  @Input('title') title: string; // Page Title

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public popoverCtrl: PopoverController,
    public modalCtrl : ModalController
    ) { }

  /**
   * Open Language Settings Page
   */
  goToLanguageSettingPage() {
    this.navCtrl.setRoot('LanguagePage');
    console.log("Clicked");
  }

  /**
   * Open Notification Pop-over
   * @param myEvent
   */
  openNotification(myEvent) {
    let popover = this.popoverCtrl.create('NotificationPage');
    popover.present({
      ev: myEvent
    });
  }

  /**
   * Dismiss function
   * This function dismiss the popup modal
   */
  createTrip()
    {
      this.navCtrl.setRoot("CreateTripPage");
      console.log("Clicked");
    }
  
  searchPeopleModal()
    {
      let peopleModal = this.modalCtrl.create('SearchPeoplePage');
      peopleModal.present();
    }  
  dismiss() 
    {
      this.viewCtrl.dismiss();
    }
}
