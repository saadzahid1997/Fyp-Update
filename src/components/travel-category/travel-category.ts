import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'travel-category',
  templateUrl: 'travel-category.html'
})
export class TravelCategoryComponent {

  text: string;

  categories: any = [
    
    { icon: 'fa fa-bed', name:'Places',  component:'PalcesPage'},
    { icon: 'fa fa-bed', name: 'HOTELS', component: 'SearchHotelsPage' },
    { icon: 'fa fa-bolt', name:'RESTURANTS', component:'ResturantsPage'},
    //{ icon: 'fa fa-bus', name: 'TRANSPORT', component: 'SearchBusPage' },
    //{ icon: 'fa fa-cog', name: 'ACTIVITIES', component: '' },
    { icon:  'fa fa-road', name: 'Trips', component: 'CreateTripPage'}
   
  ];

  constructor(public navCtrl: NavController) { }

  goToCategoryPage(page) {
    this.navCtrl.setRoot(page.component);
  }
}
