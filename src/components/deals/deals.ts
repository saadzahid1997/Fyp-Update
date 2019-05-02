/**
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This File Represent Deals Component
 * File path - '../../src/components/deals/deals'
 */

import { Component } from '@angular/core';
import { DataProvider } from '../../providers/data/data';
import { TripService } from '../../app/services/trips.service';

@Component({
  selector: 'deals',
  templateUrl: 'deals.html'
})
export class DealsComponent {

  // List of Deals
  publicTripList: any = [];

  constructor(public dataProvider: DataProvider, public tripSer:TripService) { }

  /** Do any initialization */
  ngOnInit() {
    this.tripSer.showPublicTrips().subscribe(items => {
      this.publicTripList = items;
    });
 
  }

  /**
   * Get Deals
   */
  getDeals() {
    
  }
}
