import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import {Resturant} from '../../models/resturants/resturants.interface';
import { MapsAPILoader } from '@agm/core';
import {AngularFireStorage} from '@angular/fire/storage'
import { finalize } from 'rxjs/operators';
//import { google } from '@agm/core/services/google-maps-types';
declare var google: any;
/**
 * Generated class for the AadResturantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aad-resturants',
  templateUrl: 'aad-resturants.html',
})
export class AadResturantsPage {
  resturnatRef$ : AngularFirestoreCollection<any>;
  resturant = {} as Resturant;
  google:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert : AlertController, public db:AngularFirestore, public MapsApiLoader: MapsAPILoader, public storage:AngularFireStorage) {
    this.resturnatRef$ = this.db.collection('resturants');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AadResturantsPage');
  } 
  resturantMeals()
  {
     let alertResturantMeals = this.alert.create();
     alertResturantMeals.setTitle('Meals');
     alertResturantMeals.addInput({
      type : 'checkbox',
      label: 'Breakfast',
      value: 'Breakfast'
     });
     
     alertResturantMeals.addInput({
      type : 'checkbox',
      label: 'Brunch',
      value: 'Brunch'
     });

     alertResturantMeals.addInput({
      type : 'checkbox',
      label: 'Lunch',
      value: 'Lunch'
     });

     alertResturantMeals.addInput({
      type : 'checkbox',
      label: 'Dinner',
      value: 'Dinner'
     });

     alertResturantMeals.addButton('Cancel');
    alertResturantMeals.addButton({
      text: 'OK',
      handler: data => {

        this.resturant.resturantMeals = data;
      }
    });
    alertResturantMeals.present();
  }

  resturantCuisines()
  {
    let alertResturantCuisines = this.alert.create();
     alertResturantCuisines.setTitle('Meals');
     alertResturantCuisines.addInput({
      type : 'checkbox',
      label: 'Asian',
      value: 'Asian'
     });
     
     alertResturantCuisines.addInput({
      type : 'checkbox',
      label: 'Pakistani',
      value: 'Pakistani'
     });

     alertResturantCuisines.addInput({
      type : 'checkbox',
      label: 'Vegetarian',
      value: 'Vegetarian'
     });

     alertResturantCuisines.addInput({
      type : 'checkbox',
      label: 'Non Vegetarian',
      value: 'Non Vegetarian'
     });

     alertResturantCuisines.addInput({
      type : 'checkbox',
      label: 'Halal',
      value: 'Halal'
     });

     alertResturantCuisines.addButton('Cancel');
    alertResturantCuisines.addButton({
      text: 'OK',
      handler: data => {

        this.resturant.resturantCuisines = data;
      }
    });
    alertResturantCuisines.present();    
  }
  resturantLocation()
  {
    this.MapsApiLoader.load().then(() => {
      let nativeHomeInputBox = document.getElementById('txtLocation').getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox,{
        types : ["geocode"]
      });
      autocomplete.setComponentRestrictions({ 'country': ['pk'] })
      autocomplete.addListener("place_changed", () => {
          let place = google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log(place);
          this.resturant.resturantLocationLat = place.geometry.location.lat();
          this.resturant.resturantLocationLng = place.geometry.location.lng();
          this.resturant.resturantLocation = place.formatted_address;
          console.log(this.resturant.resturantLocation);               
      });
    });
  }

  filesURL :any = [];

  handler(e) {
    const file = e.target.files[0];

    
    const filePath = `hotel/${Date.now()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL() 
          .subscribe(url => {
            this.filesURL.push(url);
            console.log(this.filesURL);
            this.resturant.fileURL = this.filesURL
          })
        })
     )
    .subscribe()
  }

  addResturant()
  { 
    this.resturnatRef$.add({
      resturantName : this.resturant.resturantName,
      resturantLocation : this.resturant.resturantLocation,
      resturantLocationLat: this.resturant.resturantLocationLat,
      resturantLocationLng: this.resturant.resturantLocationLng,
      resturantCuisines: this.resturant.resturantCuisines,
      resturantMeals : this.resturant.resturantMeals,
      resturantMail : this.resturant.resturantMail,
      resturantContact : this.resturant.resturantContact,
      resturantDescription : this.resturant.resturantDescription,
      resturantFileURL : this.resturant.fileURL 
    });
  }
}
