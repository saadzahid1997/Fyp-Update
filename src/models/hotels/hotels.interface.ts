import { EmailValidator } from "@angular/forms";

export interface Hotel
{
  hotelName: string;
  hotelLocation: string;
  hotelLocationLat:string;
  hotelLocationLng:string;
  //hotelMeals: string;
  hotelMail:EmailValidator;
  hotelContactNo:number;
  hotelDescription:string;
  hotelAmenities:string;
  roomId:string;
  fileURL:string;
  hotelCategory:string;
}