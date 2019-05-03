import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Injectable()
export class roomService {
  roomId: any;

  constructor(public afs: AngularFirestore) {}
  getRoomDetails() {
    return this.afs
      .collection('room-details')
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(data => {
            return { id: data.payload.doc.id, data: data.payload.doc.data() };
          });
        })
      );
  }
  setRoomData(roomId) {
    this.roomId = roomId;
  }
  getRoomData() {
    return this.roomId;
  }
  getRoom(hotelId) {
    const roomCollection = this.afs.collection('trips', ref =>
      ref.where('roomsRef', '==', hotelId)
    );

    return roomCollection.snapshotChanges().pipe(
      map(res => {
        return res.map(data => {
          return { id: data.payload.doc.id, data: data.payload.doc.data() };
        });
      })
    );
    // return this.afs.collection('room-details', ref =>{
    // return ref.where('roomsRef','==',hotelId).value
    // })
  }

  confirmBooking(bookingDetails) {
    console.log('bookingDetails');
    console.log(bookingDetails);
    return this.afs.collection('bookings').add(bookingDetails);
  }
}
