import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams, ModalController } from 'ionic-angular';
import { Rooms } from '../../models/rooms/rooms.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators/map';
import { query } from '@angular/core/src/render3/instructions';
import { AadResturantsPage } from '../aad-resturants/aad-resturants';
import AddHotelsPage from '../addHotels/addHotels';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { roomService } from '../../app/services/rooms.service';

/**
 * Generated class for the HotelRoomsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hotel-rooms',
  templateUrl: 'hotel-rooms.html',
})
export class HotelRoomsPage {
  rooms = {} as Rooms;
  isActive: any = [];
  enabled : boolean = false;
  roomsRef : AngularFirestoreCollection<any>;
  roomId:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private db:AngularFirestore, public viewCtrl:ViewController,public roomSer:roomService) {
    this.roomsRef = this.db.collection('room-details');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelRoomsPage');
  }
  checked(cstatus:string)
  {
    console.log(cstatus);
  }
  
  clicked()
  {
    console.log(this.isActive);
    
  }
  addRooms(rId)
  {
    
    if (this.isActive[0] == true)
      { 
        this.rooms.luxury = true;
      }
    else
      {
        this.rooms.luxury = false;
        this.enabled = false;
      }
    if (this.isActive[1] == true)
      { 
        this.rooms.one_bed_Lux = true;
        
      }
    else
      {
        this.rooms.one_bed_Lux = false;
        
      }

    if (this.isActive[2] == true)
      { 
        this.rooms.two_bed_Lux = true;
      }
    else
      {
        this.rooms.two_bed_Lux = false;
      }        
    if (this.isActive[3] == true)
      { 
        this.rooms.three_bed_Lux = true;
      }
    else
      {
        this.rooms.three_bed_Lux = false;
      }
    if (this.isActive[4] == true)
      { 
        this.rooms.four_bed_Lux = true;
      }
    else
      {
        this.rooms.four_bed_Lux = false;
      }  
    if (this.isActive[5] == true)
      { 
        this.rooms.five_bed_Lux = true;
      }
    else
      {
        this.rooms.five_bed_Lux = false;
      }  
    if (this.isActive[6] == true)
      { 
        this.rooms.normal = true;
      }
    else
      {
        this.rooms.normal = false;
      }
      if (this.isActive[7] == true)
      { 
        this.rooms.one_bed_Nom = true;
      }
    else
      {
        this.rooms.one_bed_Nom = false;
      }
    if (this.isActive[8] == true)
      { 
        this.rooms.two_bed_Nom = true;
      }
    else
      {
        this.rooms.two_bed_Nom = false;
      }        
    if (this.isActive[9] == true)
      { 
        this.rooms.three_bed_Nom = true;
      }
    else
      {
        this.rooms.three_bed_Nom = false;
      }
    if (this.isActive[10] == true)
      { 
        this.rooms.four_bed_Nom = true;
      }
    else
      {
        this.rooms.four_bed_Nom = false;
      }  
    if (this.isActive[11] == true)
      { 
        this.rooms.five_bed_Nom = true;
      }
    else
      {
        this.rooms.five_bed_Nom = false;
      }
        this.roomId = this.db.createId();
        rId = this.roomId;     
        this.roomsRef.add
        ({
            roomsRef: this.roomId, 
            Luxury : this.rooms.luxury,
            normal : this.rooms.normal,
            one_bed_Nom : this.rooms.one_bed_Nom,
            two_bed_Nom : this.rooms.two_bed_Nom,
            three_bed_Nom : this.rooms.three_bed_Nom,
            four_bed_Nom : this.rooms.four_bed_Nom,
            five_bed_Nom : this.rooms.five_bed_Nom,    
            one_bed_Lux : this.rooms.one_bed_Lux,
            two_bed_Lux : this.rooms.two_bed_Lux,
            three_bed_Lux : this.rooms.three_bed_Lux,
            four_bed_Lux : this.rooms.four_bed_Lux,
            five_bed_Lux : this.rooms.five_bed_Lux,
            one_bed_Nom_price : this.rooms.one_bed_Nom_price,
            two_bed_Nom_price : this.rooms.two_bed_Nom_price,
            three_bed_Nom_price : this.rooms.three_bed_Nom_price,
            four_bed_Nom_price : this.rooms.four_bed_Nom_price,
            five_bed_Nom_price : this.rooms.five_bed_Nom_price,
            one_bed_Lux_price : this.rooms.one_bed_Lux_price,
            two_bed_Lux_price : this.rooms.two_bed_Lux_price,
            three_bed_Lux_price : this.rooms.three_bed_Lux_price,
            four_bed_Lux_price : this.rooms.four_bed_Lux_price,
            five_bed_Lux_price : this.rooms.five_bed_Lux_price,
            numOfLuxRooms: this.rooms.numOfLuxRooms,
            numOfNomRooms: this.rooms.numOfNomRooms
          });     
          
          console.log("done");
          this.roomSer.setRoomData(rId);
          this.viewCtrl.dismiss();
          
          console.log(rId);

          
  } 
  
}
