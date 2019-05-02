import { Component, OnInit } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ModalController
} from 'ionic-angular';
import { Hotel } from '../../models/hotels/hotels.interface';
//import {google} from '@google/maps';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { MapsAPILoader } from '@agm/core';
import { Camera } from '@ionic-native/camera/ngx';
import firebase from 'firebase';
import { Rooms } from '../../models/rooms/rooms.interface';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { roomService } from '../../app/services/rooms.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators/finalize';
import { UserService } from '../../app/services/user.service';

//import { google } from '@agm/core/services/google-maps-types';
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-addHotels',
  templateUrl: 'addHotels.html'
})
export default class AddHotelsPage implements OnInit {
  isUploading: boolean = false;
  hotelLocationRef: string;
  myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  imageURI: any;
  imageFileName: any;
  hotel = {} as Hotel;
  hotelRef$: AngularFirestoreCollection<any>;
  ngZone: any;
  map: any;
  google: any;
  roomRef: any;
  api_loader;
  room = {} as Rooms;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public database: AngularFirestore,
    public alert: AlertController,
    public modal: ModalController,
    public MapsApiLoader: MapsAPILoader,
    public camera: Camera,
    public viewCtrl: ViewController,
    public roomSer: roomService,
    private storage: AngularFireStorage,
    private _user: UserService
  ) {
    console.log('i am here');
    this.hotelRef$ = this.database.collection('hotel');
    this.myPhotosRef = firebase.storage().ref('/Hotel Photos/');
    this.api_loader = this.MapsApiLoader.load();

    //console.log(this.viewCtrl.onDidDismiss());
  }
  ngOnInit() {
    console.log('in the onint');
    this.api_loader.then(() => {
      let nativeHomeInputBox = document
        .getElementById('txtLocation')
        .getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(
        nativeHomeInputBox,
        {
          types: ['geocode']
        }
      );

      autocomplete.setComponentRestrictions({ country: ['pk'] });
      autocomplete.addListener('place_changed', () => {
        console.log('api loaded');
        let place = (google.maps.places.PlaceResult = autocomplete.getPlace());
        console.log(place);
        this.hotel.hotelLocationLat = place.geometry.location.lat();
        this.hotel.hotelLocationLng = place.geometry.location.lng();
        this.hotel.hotelLocation = place.formatted_address;

        console.log(this.hotel.hotelLocation);
      });
    });
  }

  // public options = {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.FILE_URI,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE
  // }

  showRadioCategory() {
    let alertCategory = this.alert.create();
    alertCategory.setTitle('Hotel Category');
    alertCategory.addInput({
      type: 'radio',
      label: '3 Star',
      value: '3 Star',
      checked: true
    });
    alertCategory.addInput({
      type: 'radio',
      label: '5 Star',
      value: '5 Star'
    });
    alertCategory.addInput({
      type: 'radio',
      label: '7 Star',
      value: '7 Star'
    });
    alertCategory.addInput({
      type: 'radio',
      label: 'Normal',
      value: 'Normal'
    });
    alertCategory.addButton('Cancel');
    alertCategory.addButton({
      text: 'OK',
      handler: data => {
        this.hotel.hotelCategory = data;
      }
    });
    alertCategory.present();
  }

  showHotelAmenities() {
    let alertHotelAmenities = this.alert.create();
    alertHotelAmenities.setTitle('Amenities');
    alertHotelAmenities.addInput({
      type: 'checkbox',
      label: 'Free Wifi',
      value: 'Free Wifi'
    });

    alertHotelAmenities.addInput({
      type: 'checkbox',
      label: 'Free Parking',
      value: 'Free Parking'
    });

    alertHotelAmenities.addInput({
      type: 'checkbox',
      label: 'Pool',
      value: 'Pool'
    });

    alertHotelAmenities.addInput({
      type: 'checkbox',
      label: 'Air Condtioning',
      value: 'Air Condtioning'
    });

    alertHotelAmenities.addInput({
      type: 'checkbox',
      label: 'Room Service',
      value: 'Room Service'
    });

    alertHotelAmenities.addInput({
      type: 'checkbox',
      label: 'Meeting rooms',
      value: 'Meeting rooms'
    });

    alertHotelAmenities.addInput({
      type: 'checkbox',
      label: 'Kitchenette',
      value: 'Kitchenette'
    });

    alertHotelAmenities.addInput({
      type: 'checkbox',
      label: 'Restaurant',
      value: 'Restaurant'
    });

    alertHotelAmenities.addButton('Cancel');
    alertHotelAmenities.addButton({
      text: 'OK',
      handler: data => {
        this.hotel.hotelAmenities = data;
      }
    });
    alertHotelAmenities.present();
  }

  hotelLocation() {
    console.log(this.navParams.data.rId);
    this.ngOnInit();
  }

  roomsModal() {
    let roomModal = this.modal.create('HotelRoomsPage');
    roomModal.present();

    console.log(this.roomRef);
  }

  filesURL: any = [];

  handler(e) {
    this.isUploading = true;
    const file = e.target.files[0];

    const filePath = `hotel/${Date.now()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.filesURL.push(url);
            console.log(this.filesURL);
            this.hotel.fileURL = this.filesURL;
            this.isUploading = false;
          });
        })
      )
      .subscribe();
  }

  addHotel() {
    console.log(this.navParams.get('rId'));
    console.log(this.hotel.fileURL);
    this.hotelRef$
      .add({
        fileUrl: this.hotel.fileURL,
        hotelName: this.hotel.hotelName,
        hotelCategory: this.hotel.hotelCategory,
        hotelOverview: this.hotel.hotelDescription,
        hotelMail: this.hotel.hotelMail,
        hotelContactNo: this.hotel.hotelContactNo,
        hotelLocationLat: this.hotel.hotelLocationLat,
        hotelLocationLng: this.hotel.hotelLocationLng,
        hotelLocation: this.hotel.hotelLocation,
        hotelAmenities: this.hotel.hotelAmenities,
        roomId: this.hotel.roomId = this.roomSer.getRoomData()
      })
      .then(res => {
        console.log('Hotel additoin response');
        console.log(res);
        console.log(res.id);
        this._user.updateUserHotel(res.id).then(res => {
          console.log(res);
        });
      });
  }
  dismiss() {
    this.navCtrl.setRoot('SearchHotelsPage');
  }
}
