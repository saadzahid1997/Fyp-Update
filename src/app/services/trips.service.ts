import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { firestore } from 'firebase';

@Injectable()
export class TripService {


    tripCollection: AngularFirestoreCollection<any>;
    trips: Observable<any>;
    constructor(public afs: AngularFirestore) 
    {
        console.log("Trip service instantiated...");
    }
    getTripDetails() 
    {
            return this.afs.collection('trips').snapshotChanges().pipe(map(res => {
            return res.map(data => { return { id: data.payload.doc.id, data: data.payload.doc.data() } })
        }))
    }
    tripDetails(tripId)
    {
        return this.afs.collection('trips').doc(tripId).snapshotChanges().pipe(map(data => {
            return {
                id: data.payload.id, data: data.payload.data()
            }
        }))        
    }
    addHotelToTrip(hotelId, tripId) 
    {
        console.log(`hoteldId: ${hotelId}  |tripId: ${tripId}`);
        return this.afs.collection('trips').doc(tripId).set({ 'hotels': firestore.FieldValue.arrayUnion(hotelId) }, { merge: true });
    }

    addResturantToTrip(resturantId, tripId)
        {
            console.log(`hoteldId: ${resturantId}  |tripId: ${tripId}`);
            return this.afs.collection('trips').doc(tripId).set({ 'resturants': firestore.FieldValue.arrayUnion(resturantId) }, { merge: true });
        }
    
        
    addPlaceToTrip(placeId, tripId)
        {
            //console.log(`hoteldId: ${resturantId}  |tripId: ${tripId}`);
            return this.afs.collection('trips').doc(tripId).set({ 'places': firestore.FieldValue.arrayUnion(placeId) }, { merge: true });
               
        }
        
    showPublicTrips() {
            this.tripCollection = this.afs.collection('trips', ref =>
              ref.where('tripCateogory', '==', 'Public')
            );
            return this.tripCollection.snapshotChanges().pipe(map(res => {
                return res.map(data => { return { id: data.payload.doc.id, data: data.payload.doc.data() } })
            }))
          }
        
    showPrivateTrips(id: string) {
            this.tripCollection = this.afs.collection('trips', ref =>
              ref.where('userId', '==', id).where('tripCateogory', '==', 'Private')
            );
            return this.tripCollection.snapshotChanges().pipe(map(res => {
                return res.map(data => { return { id: data.payload.doc.id, data: data.payload.doc.data() } })
            }))
          }
     
    tripLikes(tripId:string)
    {
        
    }      
            
}