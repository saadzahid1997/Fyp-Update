import { Component } from '@angular/core';

/**
 * Generated class for the HotelDataComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'hotel-data',
  templateUrl: 'hotel-data.html'
})
export class HotelDataComponent {

  text: string;

  constructor() {
    console.log('Hello HotelDataComponent Component');
    this.text = 'Hello World';
  }

}
