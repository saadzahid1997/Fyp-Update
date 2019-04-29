import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripService } from '../../app/services/trips.service';
import { UserService } from '../../app/services/user.service';

/**
 * Generated class for the CreateTripPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-trip',
  templateUrl: 'create-trip.html',
})
export class CreateTripPage implements OnInit {
  tripForm: FormGroup;
  tripList: any = [];
  userId: string;
  publicTripList: { id: string; data: any; }[];
  privateTripList: { id: string; data: any; }[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public _formBuilder: FormBuilder, private tripSer: TripService , public userSer:UserService) {
    this.menuCtrl.enable(true)
  }

  ngOnInit() {
    //Public trips
    this.tripSer.showPublicTrips().subscribe(items => {
      this.publicTripList = items;
    });

    //Private trips
    this.userSer.user$.subscribe(user =>{
      this.userId = user.uid
      console.log(this.userId);
      this.tripSer.showPrivateTrips(this.userId).subscribe(items => {
        this.privateTripList = items;
        console.log(this.privateTripList)
      });  
    })
    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateTripPage');
    this.tripForm = this._formBuilder.group({
      title: ['', Validators.required],
      location: ['', Validators.required]
    })
  }
  trip() {
    this.navCtrl.push("TripsPage");
    console.log("Clicked");
  }
  tripDetails(tripDetailId)
  {
    console.log(tripDetailId);
    this.navCtrl.setRoot('TripDetailsPage',{tripDetailId});
  }
}
