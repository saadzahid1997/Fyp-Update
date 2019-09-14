import { Component, OnInit, ErrorHandler } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Trip } from '../../models/trips/trips.interface';
import { UserService } from '../../app/services/user.service';
import { MapsAPILoader } from '@agm/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { CalendarModalOptions, CalendarModal } from 'ion2-calendar';
import { ResturantService } from '../../app/services/resturant.service';
import { HotelService } from '../../app/services/hotels.service';
import { PlacesService } from '../../app/services/places.service';
declare var google :any;
/**
 * Generated class for the TripsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html',
})
export class TripsPage implements OnInit {

      trip = {} as Trip;
      resturantList:any=[];  
      tripRef$:AngularFirestoreCollection<any>;
      userId: string;
      departureDate: any;
      returnDate: any;
      inputs : any = [];
      y = 0;
      r = 0;
      p = 0;
      h = 0;
      tripResturantId: any = [];
      hotelList:any=[];
      tripHotelId:any=[];
      placeList: any = [];
      tripPlaceId: any = [];
      constructor(public navCtrl: NavController, public navParams: NavParams, private db:AngularFirestore, public alert:AlertController , public userSer:UserService  , public MapsApiLoader:MapsAPILoader  , public storage : AngularFireStorage, public modalCtrl:ModalController,
        public resSer:ResturantService, public hotelSer:HotelService, public placeSer:PlacesService) {

        this.tripRef$ = this.db.collection('trips')

      }
      ngOnInit()
      {
        // console.log(this.navParams.data.getResturant);
        // this.resturantList = this.navParams.data.getResturant;
        // console.log(this.resturantList);
        
      }

      ionViewDidLoad() {
        console.log('ionViewDidLoad TripsPage');
        this.userSer.user$.subscribe(user =>{
          this.userId = user.uid;
        })

      }

      tripCateogory()
      {
      try{
        let alertTripCateogory = this.alert.create();
        alertTripCateogory.setTitle('Trip Cateogory');
        alertTripCateogory.addInput({
          type: 'radio',
          label: 'Public',
          value: 'Public',

        })

        alertTripCateogory.addInput({
          type: 'radio',
          label: 'Private',
          value: 'Private',
          
        })

        alertTripCateogory.addButton('Cancel');
        alertTripCateogory.addButton({
          text: 'OK',
          handler: data => {

            this.trip.tripCateogory = data;
          }
        });
        alertTripCateogory.present();
        }
      catch(e)
        {
          // let alertException = this.alert.create();
          // alertException.setTitle('Trip Cateogory Missing');
          // alertException.addButton({
          //   text:'Ok'
          // })
          // alertException.present();
          alert(e.message);
        } 
      }
      tripDepLocation()
      {
        this.MapsApiLoader.load().then(() => {
          let nativeHomeInputBox = document.getElementById('txtDepLocation').getElementsByTagName('input')[0];
          let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox,{
            types : ["geocode"]
          });
          autocomplete.setComponentRestrictions({ 'country': ['pk'] })
          autocomplete.addListener("place_changed", () => {
              let place = google.maps.places.PlaceResult = autocomplete.getPlace();
              console.log(place);
              this.trip.tripDepLocationLat = place.geometry.location.lat();
              this.trip.tripDepLocationLng = place.geometry.location.lng();
              this.trip.tripDepLocation = place.formatted_address;
              //console.log(this.resturant.resturantLocation);               
          });
        });
      }

      tripRetLocation()
      {
        this.MapsApiLoader.load().then(() => {
          let nativeHomeInputBox = document.getElementById('txtRetLocation').getElementsByTagName('input')[0];
          let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox,{
            types : ["geocode"]
          });
          autocomplete.setComponentRestrictions({ 'country': ['pk'] })
          autocomplete.addListener("place_changed", () => {
              let place = google.maps.places.PlaceResult = autocomplete.getPlace();
              console.log(place);
              this.trip.tripRetLocationLat = place.geometry.location.lat();
              this.trip.tripRetLocationLng = place.geometry.location.lng();
              this.trip.tripRetLocation = place.formatted_address;
              //console.log(this.resturant.resturantLocation);               
          });
        });
      }


      openCalendar() {


        const options: CalendarModalOptions = {
          pickMode: 'range',
          color: 'primary'
        };


        let myCalendar = this.modalCtrl.create(CalendarModal, {
          options: options
        });

        myCalendar.present();


        myCalendar.onDidDismiss((date: any) => {
          
          if (date) {

            this.departureDate = date.from.string;

            this.returnDate = date.to.string;
          }
        })
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
                this.trip.fileURL = this.filesURL
              })
            })
        )
        .subscribe()
      }


    tripDays(){
      let alertDays = this.alert.create();
      alertDays.setTitle('No.of Days');
      alertDays.addInput({
        type: 'radio',
        label: '1 Day',
        value: '1 Day',
      })
      alertDays.addInput({
        type: 'radio',
        label: '2 Days',
        value: '2 Days',
      })
      alertDays.addInput({
        type: 'radio',
        label: '3 Days',
        value: '3 Days',
      })
      alertDays.addInput({
        type: 'radio',
        label: '4 Days',
        value: '4 Days',
      })
      alertDays.addInput({
        type: 'radio',
        label: '5 Days',
        value: '5 Days',
      })
      alertDays.addInput({
        type: 'radio',
        label: '6 Days',
        value: '6 Days',
      })
      alertDays.addInput({
        type: 'radio',
        label: '7 Days',
        value: '7 Days',
      })
      alertDays.addInput({
        type: 'radio',
        label: '8 Days',
        value: '8 Days',
      })
      alertDays.addInput({
        type: 'radio',
        label: '9 Days',
        value: '9 Days',
      })
      alertDays.addInput({
        type: 'radio',
        label: '10 Days',
        value: '10 Days',
      })
      alertDays.addButton('Cancel');
      alertDays.addButton({
        text: 'OK',
        handler: data => {

          this.trip.tripDays = data;
        }
      
      })
      alertDays.present();
    }

    tripNights(){
      let alertNights = this.alert.create();
      alertNights.setTitle('No.of Nights');
      alertNights.addInput({
      type: 'radio',
      label: '1 Night',
      value: '1 Night',
      })
      alertNights.addInput({
      type: 'radio',
      label: '2 Nights',
      value: '2 Nights',
      })
      alertNights.addInput({
      type: 'radio',
      label: '3 Nights',
      value: '3 Nights',
      })
      alertNights.addInput({
      type: 'radio',
      label: '4 Nights',
      value: '4 Nights',
      })
      alertNights.addInput({
      type: 'radio',
      label: '5 Nights',
      value: '5 Nights',
      })
      alertNights.addInput({
      type: 'radio',
      label: '6 Nights',
      value: '6 Nights',
      })
      alertNights.addInput({
      type: 'radio',
      label: '7 Nights',
      value: '7 Nights',
      })
      alertNights.addInput({
      type: 'radio',
      label: '8 Nights',
      value: '8 Nights',
      })
      alertNights.addInput({
      type: 'radio',
      label: '9 Nights',
      value: '9 Nights',
      })
      alertNights.addInput({
      type: 'radio',
      label: '10 Nights',
      value: '10 Nights',
      })
      alertNights.addButton('Cancel');
      alertNights.addButton({
        text: 'OK',
        handler: data => {

          this.trip.tripNights = data;
        }
      
      })
      alertNights.present();
    }


    tripServices(){
      let alertServices = this.alert.create();
      alertServices.setTitle('Services Included');
      alertServices.addInput({
      type: 'checkbox',
      label: 'Coaster',
      value: 'Coaster',
      })
      alertServices.addInput({
        type: 'checkbox',
        label: 'Grand Cabin',
        value: 'Grand Cabin',
      })
      alertServices.addInput({
        type: 'checkbox',
        label: 'Fuel',
        value: 'Fuel',
      })
      alertServices.addInput({
        type: 'checkbox',
        label: 'Breakfast',
        value: 'Breakfast',
      })
      alertServices.addInput({
        type: 'checkbox',
        label: 'Brunch',
        value: 'Brunch',
      })
      alertServices.addInput({
        type: 'checkbox',
        label: 'Lunch',
        value: 'Lunch',
      })
      alertServices.addInput({
        type: 'checkbox',
        label: 'Dinner',
        value: 'Dinner',
      })
      alertServices.addInput({
        type: 'checkbox',
        label: 'Tour Guide',
        value: 'Tour Guide',
      })
      alertServices.addInput({
        type: 'checkbox',
        label: 'Night Stay',
        value: 'Night Stay',
      })
      alertServices.addInput({
        type: 'checkbox',
        label: 'Photography',
        value: 'Photography',
      })
      alertServices.addInput({
        type: 'checkbox',
        label: 'Tickets',
        value: 'Tickets',
      })
      alertServices.addInput({
        type: 'checkbox',
        label: 'First Aid',
        value: 'First Aid',
      })
      alertServices.addInput({
        type: 'checkbox',
        label: 'Medical Charges',
        value: 'Medical Charges',
      })
      alertServices.addInput({
        type: 'text',
        label: 'Others',
        value: '',
      })
      alertServices.addButton('Cancel');
      alertServices.addButton({
        text: 'OK',
        handler: data => {

          this.trip.tripServices = data;
        }
      
      })
      alertServices.present();
    }


    addDay()
    {
      
      this.inputs.push({
        placeholder: 'Day '+this.inputs.length,
        value:'Day '+this.inputs.length,
      
      });
      this.trip.tripDayDescription = this.inputs;
    }

    addPlaces(tripName)
    {
        
      console.log(this.trip.tripName)
      tripName = this.trip.tripName
      let placeModel =  this.modalCtrl.create('PalcesPage', {tripName})
      placeModel.present();

    }

    addHotels(tripName)
    {
      console.log(this.trip.tripName)
      tripName = this.trip.tripName
      let hotelModel =  this.modalCtrl.create('SearchHotelsPage', {tripName})
      hotelModel.present();

      //Store Hotels Id
      // this.hotelList[this.h] = this.hotelSer.getHotelDetails();
      // console.log(this.HotelList[this.h].id);
      // this.tripHotelId[this.h] = this.hotelList[this.h].id
      // this.h = this.h+1;
      // console.log(this.tripHotelId);

    }

    addResturants(tripName)
    {
      console.log(this.trip.tripName)
      tripName = this.trip.tripName
    // this.navCtrl.setRoot('ResturantsPage', {tripName})
      let resModal = this.modalCtrl.create('ResturantsPage',{tripName})
        
      resModal.present();
      //Store Resturant Id
      // this.resturantList[this.r] = this.resSer.getResDetails();
      // console.log(this.resturantList[this.r].id);
      // this.tripResturantId[this.r] = this.resturantList[this.r].id
      // this.r = this.r+1;
      // console.log(this.tripResturantId);

      //Store Hotels Id

    }

    hotelAdded()
    {
      this.hotelList[this.h] = this.hotelSer.getHotelDetails();
      console.log(this.hotelList[this.h]);
      this.tripHotelId[this.h] = this.hotelList[this.h].id
      this.h = this.h+1;
      console.log(this.tripHotelId);
      
    }

    placeAdded()
    {
      this.placeList[this.p] = this.placeSer.getPlaceDetails();
      console.log(this.placeList[this.p]);
      this.tripPlaceId[this.p] = this.placeList[this.p].id
      this.p = this.p+1;
      console.log(this.tripPlaceId);
      
    }

    resturantAdded()
    {
      this.resturantList[this.r] = this.resSer.getResDetails();
      console.log(this.resturantList[this.r]);
      this.tripResturantId[this.r] = this.resturantList[this.r].id
      this.r = this.r+1;
      console.log(this.tripResturantId);
      
    }
      addTrips()
      {
        try{
          this.tripRef$.add({
              tripName : this.trip.tripName,
              tripDescription:this.trip.tripDescription,
              tripDepartureLocation: this.trip.tripDepLocation,
              tripDepartureLocationLat : this.trip.tripDepLocationLat,
              tripDepartureLocationLng: this.trip.tripDepLocationLng,
              tripReturnLocation: this.trip.tripRetLocation,
              tripReturnLocationLat : this.trip.tripRetLocationLat,
              tripReturnLocationLng: this.trip.tripRetLocationLng,
              tripHost : this.trip.tripHost,
              tripCateogory: this.trip.tripCateogory,
              userId: this.trip.userId = this.userId,
              tripFileURL : this.trip.fileURL,
              tripDeparture: this.trip.tripDeparture = this.departureDate,
              tripReturn:this.trip.tripReturn = this.returnDate,
              tripDayDescription:this.trip.tripDayDescription,
              tripResturants:this.trip.tripResturants = this.tripResturantId,
              tripHotels:this.trip.tripHotels = this.tripHotelId,
              tripPlaces:this.trip.tripPlaces = this.tripPlaceId,
              tripServices:this.trip.tripServices,
              tripDays:this.trip.tripDays,
              tripNights:this.trip.tripNights,
              tripPrice:this.trip.tripPrice
        }).then(res => {
          console.log('Hotel additoin response');
          console.log(res);
          console.log(res.id);
          this.userSer.updateUserHotel(res.id).then(res => {
            console.log(res);
          });
        });
      }
      catch(e)
        {
          let alertExcep = this.alert.create();
          alertExcep.setTitle('Some field is missing');
          alertExcep.addButton('Ok');
          alertExcep.present();
        }
      }
      dismiss()
      {
        this.navCtrl.setRoot('CreateTripPage');
      }
  }
  
 
