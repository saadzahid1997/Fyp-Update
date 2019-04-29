import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Injectable()
export class HotelService {


    hotelCollection: AngularFirestoreCollection<any>;
    hotels: Observable<any>;
    hotelDetailId: any;
    constructor(public afs: AngularFirestore) {
        console.log("Hotel service instantiated...");

    }

    getHotels() {
        return this.afs.collection('hotel').snapshotChanges().pipe(map(res => {
            return res.map(data => { return { id: data.payload.doc.id, data: data.payload.doc.data() } })
        }))
    
    }

    showHotelDetails(hotelDetailId) {
        return this.afs.collection('hotel').doc(hotelDetailId).snapshotChanges().pipe(map(data => {
            return {    
                id: data.payload.id, data: data.payload.data()
            }
        }))
    }

    bookHotel(book) {
        return this.afs.collection('booking').add(book);
    }


}