/**
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This File Represent Checkout Page Component
 * File path - '../../src/pages/checkout/checkout'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  // Types of Payment
  paymentTypes: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
    this.paymentTypes = 'card'; // Default Payment Type
  }

  /***
   * --------------------------------------------------------------
   * Open Payment Page
   * --------------------------------------------------------------
   * @method    goToPaymentPage This Function Close Current Modal and Open Payment Page.
   */
  goToPaymentPage() {
    this.viewCtrl.dismiss();
    this.navCtrl.setRoot('PaymentPage');
  }
}
