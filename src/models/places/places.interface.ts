import { EmailValidator } from "@angular/forms";

export interface Place
{
  placeName:string;
  placeLocation:string;
  placeLocationLat:string;
  placeLocationLng:string;
  placeDescription:string;
  fileURL:string;
}