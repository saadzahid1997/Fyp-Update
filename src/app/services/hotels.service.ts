import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { UserService } from './user.service';

@Injectable()
export class HotelService {


    user:any;
    hotelCollection: AngularFirestoreCollection<any>;
    hotels: Observable<any>;
    hotelDetailId: any;
    HotelDetail: any;
    constructor(public afs: AngularFirestore, public userSer:UserService) {
        console.log("Hotel service instantiated...");
        this.userSer.user$.subscribe(user =>{
            this.user = user
        })

    }

    getUserHotels(hotelId)
    {
        return this.afs.collection('hotel').doc(hotelId).snapshotChanges().pipe(map(data => {
            return {    
                id: data.payload.id, ...data.payload.data()
            }
        }))

    }

    getHotels() {
        return this.afs.collection('hotel').snapshotChanges().pipe(map(res => {
            return res.map(data => { return { id: data.payload.doc.id, data:data.payload.doc.data() } })
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
    setHotelDetails(hotelDetail)
    {
        this.HotelDetail = hotelDetail;
    }

    getHotelDetails()
    {
        return this.HotelDetail;
    }


}